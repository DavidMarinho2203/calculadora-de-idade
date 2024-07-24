// obtendo os valores do button
const btn = document.querySelector("button");
// obtendo o local de resposta
const respResultados = document.querySelectorAll(".resultado");
// obtendos os locais para quando der algum error.
const localDosErros = document.querySelectorAll(".local_error")
const labels = document.querySelectorAll('label')
const inputs = document.querySelectorAll("input")

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    // obtendo valores do form
    const dia = document.getElementById("inDia").value;
    const mes = document.getElementById("inMes").value;
    const ano = document.getElementById("inAno").value;

    // obtendo a data fornecidade e a data de hoje.
    const dataFornecida = new Date(ano, mes - 1, dia);
    const dataDeHoje = new Date();

    // obtendo a diferença de anos,meses e dias.
    let difDeAnos = dataDeHoje.getFullYear() - dataFornecida.getFullYear()
    let difDeMeses = dataDeHoje.getMonth() - dataFornecida.getMonth()
    let difDeDias = dataDeHoje.getDate() - dataFornecida.getDate()

    if (dia == "" || mes == "" || ano == "") { // tratando caso tenha algum valor vazio.
        console.log("if1")
        chamarErrorDeDados()
        // for (let i = 0; i < localDosErros.length; i++) { // vou está passsando por todos os inputs.
        //     inputs[i].classList.add('error')
        //     labels[i].classList.add('error')
        // }
        // for (let i = 0; i < respResultados.length; i++) {
        //     respResultados[i].textContent = '--'
        // }
        // // atribuindo um tempo para que as classes error se remova.
        // setInterval(() => {
        //     const localDosErros = document.querySelectorAll(".local_error")
        //     for (let i = 0; i < localDosErros.length; i++) {
        //         inputs[i].classList.remove('error')
        //         labels[i].classList.remove('error')
        //     }
        // }, 2000)
        return;
    } else if (ano % 4 == 0 && mes == 2 && dia > 29) { // tratando anos bissextos
        console.log("if2")
        chamarErrorDeDados(0)
        return
    }else if (ano % 4 != 0 && mes == 2 && dia >= 28) { // tratando meses de fevereiro
        console.log("if3")
        chamarErrorDeDados(0)
        return
    } else if ((mes == 4 && dia > 30) || (mes == 6 && dia > 30) || (mes == 9 && dia > 30) || (mes == 11 && dia > 30)) { // tratando de abril,junho,setembro e novembro.
        console.log("if3")
        chamarErrorDeDados(0)
        return
    } else if (ano.length != 4 || (mes.length > 2 || mes.length < 1) || (dia.length > 2 || dia.length < 1) || (mes < 1 || mes > 12) || (dia < 1 || dia > 31)) { // trantando erros de anos, meses e dias incorretos.
        console.log("if4")
        chamarErrorDeDados(0)
        return
    } else if (dataDeHoje.getTime() < dataFornecida.getTime()) { // tratando as entradas que forem datas futuras
        console.log("if5")
        alert("Essa data ainda não aconteceu!")
        chamarErrorDeDados(1)
        // document.getElementById("inDia").value = "";
        // document.getElementById("inMes").value = "";
        // document.getElementById("inAno").value = "";
        // for (let i = 0; i < respResultados.length; i++) {
        //     respResultados[i].textContent = '--'
        // }
        return;
    } else if (dataDeHoje.getDate() == dataFornecida.getDate()) { // tratando as entradas que forem a data igual a fornecida
        console.log("if6")
        alert("Essa data é hoje!")
        chamarErrorDeDados(1)
        // document.getElementById("inDia").value = "";
        // document.getElementById("inMes").value = "";
        // document.getElementById("inAno").value = "";
        // for (let i = 0; i < respResultados.length; i++) {
        //     respResultados[i].textContent = '--'
        // }
        return;
    }

    // verifico se é o mesmo dia do mês.
    if (difDeDias <= 0) {
        difDeMeses--;
        const ultimoDiaMesAnterior = difDeDias + (new Date(dataDeHoje.getFullYear(), dataDeHoje.getMonth(), 0).getDate());
        difDeDias = ultimoDiaMesAnterior
    }
    // verifico se é o mesmo mes.
    if (difDeMeses < 0) {
        difDeAnos--;
        difDeMeses += 12;
    }
    // garantir que os anos não sejam negativos
    if (difDeAnos <= 0) {
        difDeAnos = 0
    }

    const arrDif = [difDeAnos, difDeMeses, difDeDias]
    // fazendo um loop nois locais de resposta e armazenando em ordem (ano,mes,dia)
    for (let i = 0; i < respResultados.length; i++) {
        respResultados[i].textContent = arrDif[i]
    }

});

function chamarErrorDeDados(num) { // função para tratamento de erros (anos bissextos e dias, meses e anos incorretos)
    // deve ser um dia válido
    switch (num) {
        case 0:
            document.getElementById("inDia").value = "";
            document.getElementById("inMes").value = "";
            document.getElementById("inAno").value = "";
            for (let i = 0; i < localDosErros.length; i++) {
                respResultados[i].textContent = '--'
                inputs[i].classList.add('error')
                labels[i].classList.add('error')
                localDosErros[i].classList.add('error')
                switch (i) {
                    case 0:
                        localDosErros[i].textContent = "Deve ser um dia válido"
                        break;
                    case 0:
                        localDosErros[i].textContent = "Deve ser um mês válido"
                        break;
                    default:
                        localDosErros[i].textContent = "Deve ser um ano válido"
                        break;
                }
            }

            setTimeout(() => {
                for (let i = 0; i < localDosErros.length; i++) {
                    respResultados[i].textContent = '--'
                    inputs[i].classList.remove('error')
                    labels[i].classList.remove('error')
                    localDosErros[i].classList.remove('error')
                    localDosErros[i].style.display = "none"
                }
            }, 2000)

            break;

        default:
            document.getElementById("inDia").value = "";
            document.getElementById("inMes").value = "";
            document.getElementById("inAno").value = "";
            for (let i = 0; i < respResultados.length; i++) {
                respResultados[i].textContent = '--'
            }
            document.getElementById("inDia").focus()
            break;
    }

}