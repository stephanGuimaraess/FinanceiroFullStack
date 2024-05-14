import $ from 'jquery';

export function trocarcorrosa() {
  $(".color1").click(function() {
    $("#container-img, #navtrocacor, #footerpai").css("background-color","pink");
    $(".editcolor, .letrastrocacor, .pfootter1, .pfootter2").css("color","black");
    localStorage.setItem("background-color", "pink");
    localStorage.setItem("text-color", "black");
  });
}

export function trocarcorblack() {
  $(".color2").click(function() {
    $("#container-img, #navtrocacor, #footerpai").css("background-color","black");
    $(".editcolor, .letrastrocacor, .pfootter1, .pfootter2").css("color","white");
    localStorage.setItem("background-color", "black");
    localStorage.setItem("text-color", "white");
  });
}

export function trocarcorroxo() {
  $(".color3").click(function() {
    $("#container-img, #navtrocacor, #footerpai").css("background-color","blueviolet");
    $(".editcolor, .letrastrocacor, .pfootter1, .pfootter2").css("color","white");
    localStorage.setItem("background-color", "blueviolet");
    localStorage.setItem("text-color", "white");
  });
}

export function trocarcorcinza() {
  $(".color4").click(function() {
    $("#container-img, #navtrocacor, #footerpai").css({'background-color': "rgb(151, 148, 149)"});
    $(".editcolor, .letrastrocacor, .pfootter1, .pfootter2").css("color","white");
    localStorage.setItem("background-color", "rgb(151, 148, 149)");
    localStorage.setItem("text-color", "white");
  });
}

export function mantercor() {
  const backgroundColor = localStorage.getItem("background-color");
  const textColor = localStorage.getItem("text-color");

  if (backgroundColor) {
    $("#container-img,  #navtrocacor, #footerpai").css("background-color", backgroundColor);
  }

  if (textColor) {
    $(".editcolor, .letrastrocacor, .pfootter1, .pfootter2").css("color", textColor);
  }
}