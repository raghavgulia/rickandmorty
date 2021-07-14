let locations = [];

const checkStatus = (a) => {
  if (a === "Alive") return "green";
  if (a === "Dead") return "red";
  return "grey";
};

const checkGender = (a) => {
  if (a === "Male") return "aqua";
  if (a === "Female") return "hotpink";
  return "grey";
};
document.getElementById("reset").addEventListener("click", () => {
  document.querySelectorAll(".ch").forEach((e) => {
    e.style.display = "flex";
  });
  document.querySelectorAll("input").forEach((e) => {
    e.checked = false;
  });
});
document.querySelectorAll(".ch").forEach((e) => {
  console.log(e.classList[1]);
  fetch(`https://rickandmortyapi.com/api/character/${e.classList[1]}`)
    .then((a) => a.json())
    .then((s) => {
      locations.push(s.location.name);
      locations = locations.filter(function (item, pos) {
        return locations.indexOf(item) == pos;
      });
      console.log(s);
      e.innerHTML = `<h2>${s.name} -${
        s.species.toLowerCase().startsWith("a") ||
        s.species.toLowerCase().startsWith("e") ||
        s.species.toLowerCase().startsWith("i") ||
        s.species.toLowerCase().startsWith("o") ||
        s.species.toLowerCase().startsWith("u")
          ? "An"
          : "A"
      } ${s.species}</h2><h3>In ${
        s.location.name
      }</h3><div style="background-color:${checkStatus(s.status)};"><h4>${
        s.status
      }
      </h4><img src="${s.image}" loading="lazy"><div>`;
      e.id = s.location.name + ",," + s.gender;
      e.style.backgroundColor = checkGender(s.gender);
      e.addEventListener("click", function () {
        document.querySelector(".overlay").classList.remove("hidden");
        document.querySelector(".overlay").innerHTML = this.outerHTML;
      });
    });
});

fetch("https://rickandmortyapi.com/api/location")
  .then((a) => a.json())
  .then((s) => {
    s.results.forEach((e) => locations.push(e.name));
    locations = locations.filter((item, pos) => locations.indexOf(item) == pos);
    locations.forEach((e) => {
      console.log(e);
      document.querySelector(".radios").insertAdjacentHTML(
        "afterbegin",
        `<div><input type="radio" id="${e}" name="fav_language" value="JavaScript"> 
<label for="${e}" class="s">${e}</label></div> `
      );
    });
    document.querySelectorAll(".s").forEach((r) => {
      r.addEventListener("click", function () {
        document.querySelectorAll(".ch").forEach((e) => {
          e.style.display = "flex";
        });
        document.querySelectorAll("input").forEach((e) => {
          e.checked = false;
        });
        console.log("hhhh");
        console.log(this.innerHTML);
        document.querySelectorAll(".ch").forEach((e) => {
          if (e.id.split(",,")[0] !== this.innerHTML) e.style.display = "none";
        });
      });
    });
    document.querySelectorAll(".st").forEach((r) => {
      r.addEventListener("click", function () {
        document.querySelectorAll(".ch").forEach((e) => {
          e.style.display = "flex";
        });
        document.querySelectorAll("input").forEach((e) => {
          e.checked = false;
        });
        console.log("hhhh");
        console.log(this.innerHTML);
        document.querySelectorAll(".ch").forEach((e) => {
          if (e.id.split(",,")[1] !== this.innerHTML) e.style.display = "none";
        });
      });
    });
  });

document.querySelector(".overlay").addEventListener("click", function () {
  this.classList.add("hidden");
});
