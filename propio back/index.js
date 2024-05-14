const express = require('express');
const session = require('express-session');
const fileupload = require('express-fileupload');
const fs = require('fs');
const cors = require('cors');
const app = express();
var path = require('path');
const mysql = require('mysql2');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const secret = 'St86468540@';
const crypto = require('crypto');
const validator = require('validator');


function criarhash(password){
  return crypto.createHash('sha256').update(password).digest('hex');
}

class Usuario{

  constructor(email, password){
    this.email = email;
    this.password = criarhash(password);

  }
}


const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'St86468540@',
    database:'bd_stephan'

});

connection.connect();

const port = 5000;

app.use(session({secret: 'St86468540@'}));
app.use(express.json());
app.use(fileupload(
    
));

app.use(cors());

app.post('/login', (req,res) => {

    const { email, password } = req.body;
    const usuario =  new Usuario(email, password);
   
    connection.query('SELECT nome, salario, nascimento, idcliente FROM usuario  WHERE email = ? AND password = ?', [usuario.email, usuario.password], (err, results, fields) => {
      if (err) throw err;
      if (results.length === 1) {
       
        res.status(200).json({message: 'success', results});
                       
      } else {
        res.status(401).json({message: 'error'});
      }
     
    });
})

app.get('/images/:idcliente', (req, res) => {
  const idcliente = req.params.idcliente;

  // Consulta SQL para buscar a imagem correspondente ao idCliente
  const sql = 'SELECT imagem_usuario FROM imagemusuario WHERE id_usuario = ?';
  const params = [idcliente];

  connection.query(sql, params, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar imagem.');
    } else if (results.length === 0) {
      res.status(404).send('Imagem não encontrada.');
    } else {
      const imagem = results[0].imagem_usuario;

      // Define o tipo de conteúdo da resposta como imagem
      res.set('Content-Type', 'image/png');

      // Envia a imagem como resposta
      res.send(imagem);
    }
  });
});

app.post('/register', (req,res)=> {
  const {username,salario,nascimento,email,password,confirmpassword} = req.body;
  const usuario =  new Usuario(email, password);

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'EMAIL INVÁLIDO' });
  }


  if(password !=confirmpassword){

    return res.status(422).json({message: 'AS SENHAS DIGITADAS NÃO SÃO IGUAIS'});
  }
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'PREENCHA TODOS OS CAMPOS' });
  }

  connection.query('SELECT email FROM usuario WHERE email = ?', [usuario.email], (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    }

    if (results && results.length > 0) {
      return res.status(401).json({ message: 'EMAIL JÁ CADASTRADO' });
    }

    connection.query('INSERT INTO usuario (nome,salario,nascimento,email,password) values(?,?,?,?,?)',
      [username,salario,nascimento,usuario.email,usuario.password],
      (err, results, fields) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
        res.status(200).json({ message: 'REGISTER_SUCCESS' });
      }
    );
  });
});


app.post('/resumo', (req, res) => {
  const { gastos }  = req.body;
  
  let success = true;

  gastos.forEach((gasto) => {
    const { nome, valor, idcliente } = gasto;

    connection.query('INSERT INTO gastos (nomeproduto, valorproduto, datahora, id_usuario) VALUES (?, ?, NOW(), ?)',
     [nome, valor, idcliente],
     (err, results, fields) => {
      if (err) {
        success = false;
      } else {
        connection.query('UPDATE gastos g1 INNER JOIN (SELECT id_usuario, SUM(valorproduto) AS valor_total FROM gastos GROUP BY id_usuario) g2 ON g1.id_usuario = g2.id_usuario SET g1.valor_total = g2.valor_total WHERE g1.id_usuario = ?', [idcliente]);
      }
    });
  });
  
  
  if (success) {
    res.status(200).json({ message: 'Gastos adicionados ao banco de dados!' });
  } else {
    res.status(500).json({ message: 'Erro ao adicionar gastos ao banco de dados!' });
  }
});

app.post('/getresumo', (req, res) => { 

  const { idcliente }  = req.body;
 

  connection.query('SELECT nomeproduto, valorproduto, datahora, valor_total FROM gastos WHERE id_usuario = ?',
  [idcliente], (err, results, fields) => {

    if(err){
      console.error(err);
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    }else{
      res.status(200).json(results);
    }
    
})


})

app.post('/getresumototal', (req, res) => { 

  const { start, end, idcliente }  = req.body;
 

  connection.query(`SELECT 
  DATE_FORMAT(datahora, '%Y-%m') AS mes,
  SUM(valorproduto) AS total
FROM gastos
WHERE id_usuario = ?
  AND datahora BETWEEN ? AND ?
GROUP BY mes`,
[idcliente, start, end], (err, results, fields) => {

    if(err){
      console.error(err);
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    }else{
      res.status(200).json(results);
      
    }
    
})


})

app.post('/getresumodiario', (req, res) => { 
  const { diario, idcliente }  = req.body;
 
  // Query para buscar os produtos e valores do dia específico
  const queryProdutos = `
    SELECT 
      nomeproduto, valorproduto, datahora
    FROM 
      gastos 
    WHERE 
      id_usuario = ? AND
      datahora BETWEEN ? AND ?
  `;

  // Query para buscar o total dos valores do dia específico
  const queryTotal = `
    SELECT 
      SUM(valorproduto) AS total
    FROM 
      gastos 
    WHERE 
      id_usuario = ? AND
      datahora BETWEEN ? AND ?
  `;

  const startOfDay = new Date(diario);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(diario);
  endOfDay.setUTCHours(23, 59, 59, 999);

  connection.query(queryProdutos, [idcliente, startOfDay, endOfDay], (err, resultsProdutos, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
    } else {
      // Verifica se há registros para a data selecionada
      if (resultsProdutos.length === 0) {
        return res.status(404).json({ message: 'Nenhum registro encontrado para a data selecionada' });
      }
      
      // Busca o total dos valores do dia específico
      connection.query(queryTotal, [idcliente, startOfDay, endOfDay], (err, resultsTotal, fields) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
        } else {
          // Formata os resultados em um objeto
          const resultado = {
            produtos: resultsProdutos,
            totaldiario: resultsTotal[0].total || 0,
            datahora: resultsProdutos[0].datahora,
          };
          res.status(200).json(resultado);
        }
      });
    }
  });
});



app.post('/upload',(req,res)=>{

  const file = req.files.file;
  const idcliente = req.body.idcliente;
  
  const filePath = `./uploads/${file.name}`;
  const dirPath = path.dirname(filePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  file.mv(filePath, (err) => {
    if (err) {
      console.error('Erro ao mover o arquivo:', err);
      return res.status(500).json({message: 'Erro ao mover o arquivo'});
    }
  
    // Ler o arquivo para armazená-lo no banco de dados
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return res.status(500).json({message: 'Erro ao ler o arquivo'});
      }
  
      // Executar a query para inserir a imagem no banco de dados
      const querySelect = `SELECT * FROM imagemusuario WHERE id_usuario = ?`;
      const queryInsert = `INSERT INTO imagemusuario (id_usuario, imagem_usuario) VALUES (?, ?)`;
      
      // Consulta a tabela imagemusuario para verificar se o usuário já possui uma imagem salva
      connection.query(querySelect, [idcliente], (err, results, fields) => {
        if (err) throw err;
        if (results.length === 1) {
          // Se o usuário já possuir uma imagem, atualize a imagem existente
          connection.query(`UPDATE imagemusuario SET imagem_usuario = ? WHERE id_usuario = ?`, [data, idcliente], (err, results, fields) => {
            if (err) throw err;
            console.log('Imagem atualizada com sucesso!');
          });
        } else {
          // Se o usuário ainda não possuir uma imagem, faça a inserção
          connection.query(queryInsert, [idcliente, data], (err, results, fields) => {
            if (err) throw err;
            console.log('Imagem inserida com sucesso!');
          });
        }
      });
    });
  });
})

app.listen(port,()=>{

    console.log("rodando na porta 5000");
    

});

