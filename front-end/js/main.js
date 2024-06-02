let listaItens = [];
let itemAEditar;

let form = document.getElementById("form-itens");
const itensInput = document.querySelector("#receber-item");
const ulItens = document.querySelector("#lista-de-itens");
const ulItensComprados = document.querySelector("#itens-comprados");
const listaRecuperada = localStorage.getItem('listaItens');

function atualiazaLocalStorage() {
  localStorage.setItem("listaItens", JSON.stringify(listaItens));
}

if (listaRecuperada) {
  listaItens = JSON.parse(listaRecuperada);
  mostrarItem();
}else{
  listaItens = [];
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  salvarItem();
  mostrarItem();
  itensInput.focus();
});

function salvarItem() {
  const comprasItem = itensInput.value;
  const checarDuplicado = listaItens.some(
    (elemento) => elemento.item.toUpperCase() === comprasItem.toUpperCase()
  );

  if (checarDuplicado) {
    alert("Você já adicionou esse item");
  } else {
    listaItens.push({
      item: comprasItem,
      checar: false,
    });

    console.log(listaItens);
  }
}

function mostrarItem() {
  ulItens.innerHTML = "";
  ulItensComprados.innerHTML = "";

  listaItens.forEach((elemento, index) => {
    if (elemento.checar) {
      ulItensComprados.innerHTML += `
          <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
            <div>
                <input type="checkbox" checked class="is-clickable" />
                <span class="itens-comprados is-size-5">${elemento.item}</span>
            </div>
            <div>
                <i class="fa-solid fa-trash is-clickable deletar"></i>
            </div>
        </li>
      `;
    } else {
      ulItens.innerHTML += `
            <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
                <div>
                    <input type="checkbox" class="is-clickable" />
                    <input type="text" class="is-size-5" value="${
                      elemento.item
                    }" ${
        index !== Number(itemAEditar) ? "disabled" : ""
      }></input>
                </div>
                <div>
                    ${
                      index === Number(itemAEditar)
                        ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>'
                        : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'
                    }
                    <i class="fa-solid fa-trash is-clickable deletar"></i>
                </div>
            </li>
`;
    }
    itensInput.value = "";
    atualiazaLocalStorage();
  });

  const inputCheck = document.querySelectorAll('input[type="checkbox"]');

  inputCheck.forEach((i) => {
    i.addEventListener("click", (event) => {
      valorDoElemento =
        event.target.parentElement.parentElement.getAttribute("data-value");
      listaItens[valorDoElemento].checar = event.target.checked;
      mostrarItem();
    });
  });

  const deletarObjetos = document.querySelectorAll(".deletar");
  deletarObjetos.forEach((i) => {
    i.addEventListener("click", (event) => {
      valorDoElemento =
        event.target.parentElement.parentElement.getAttribute("data-value");
      listaItens.splice(valorDoElemento, 1);
      mostrarItem();
    });
  });

  const editarItens = document.querySelectorAll(".editar");
  editarItens.forEach((i) => {
    i.addEventListener("click", (event) => {
      itemAEditar =
        event.target.parentElement.parentElement.getAttribute("data-value");
      mostrarItem();
    });
  });
}

function salvarEdicao() {
  const itemEditado = document.querySelector(
    `[data-value="${itemAEditar}"] input[type="text"]`
  );
  listaItens[itemAEditar].item = itemEditado.value;
  itemAEditar = -1;
  mostrarItem();
}
