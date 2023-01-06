var minSalary = 1320;
var income = {
    essential : 0,
    nEssent : 0,
    invest : 0,
    spent : 0
};

cdi = 12;
// cdi = 13.65;
cdiNow.innerHTML = `${cdi}`;
rateValue.value = cdi;

time_ipt.value = `12`
timeLabel.innerHTML = `quantos meses?`

function simulateEssentialSpent(){
    if ((salary_ipt.value).length == 0) {
        view_area_window1.innerHTML = ``;
        verify = false;
    }else{
        let salary = Number(salary_ipt.value);
        var verify = true;
    
        if (isNaN(salary)){
            alert('Insira um valor de salario seguindo o modelo R$"0.00"')
            verify = false;
        }
        if (salary < 0){
            alert('O salario não pode ser negativo!')
            verify = false;
        }
        // if (salary < minSalary){
        //     alert('O salario precisa ser de pelo menos um salario minimo')
        //     verify = false;
        // }

        
        if(verify){
            income.essential = salary * 0.5;
            income.nEssent = salary * 0.1;
            income.invest = salary * 0.3;
            income.spent = salary * 0.1;
    
            view_area_window1.innerHTML = `
                <h3>Gastos ideais</h3>
                (50%) 🏠 Gastos essenciais = R$${income.essential.toFixed(2)}
                <br>(10%) 🍹 Não essencial = R$${income.nEssent.toFixed(2)}
                <br>(30%) 📈 Investimentos = R$${income.invest.toFixed(2)}
                <br>(10%) 💱 Gastos livres = R$${income.spent.toFixed(2)}
            `;

            investValue_ipt.value = `${income.invest.toFixed(2)}`;
            view_area_window2_1.innerHTML = ``;
            view_area_window2_2.innerHTML = ``;
        }
    }
}
function year(){
    time_ipt.value = `1`
    timeLabel.innerHTML = `quantos anos?`
}
function month(){
    time_ipt.value = `12`
    timeLabel.innerHTML = `quantos meses?`
}
function day(){
    time_ipt.value = `30`
    timeLabel.innerHTML = `quantos dias?`
}

function simulateInvest(){
    const time = Number(time_ipt.value);
    const radio = document.querySelector('input[name="checkRadio"]:checked').value

    var rate = 0;
    let checkTime = '';
    
    if (radio == 0) {
        rate = ((Number(rateValue.value) / 12) / 100) + 1;
        // rate = (Number(rateValue.value) / 100) + 1;
        checkTime = 'year'
    }else if(radio == 1){
        rate = ((Number(rateValue.value) / 12) / 100) + 1;
        checkTime = 'month'
    }else{
        rate = (((Number(rateValue.value) / 12) / 30 ) / 100) + 1;
        checkTime = 'day'
    }

    const investValue = Number(investValue_ipt.value);
    
    // CALCULO JUROS COMPOSTOS

    view_area_window2_1.innerHTML = `<h3>Juros compostos</h3>`
    
    let amount = 0;
    let yearCount = 0;

    // AO ANO
    if (checkTime == 'year') {
        // amount = investValue * (1 + rate) ** time;
        
        for (let i = 0; i < time * 12; i++){
            if (i == 0) {
                amount = investValue;
                // amount += (amount * rate);
            }else{
                amount = (amount * rate) + investValue;
            }
            if ((i+1) % 12 == 0) {
                view_area_window2_1.innerHTML += `Montante ${++yearCount}° ano: <b>${amount.toFixed(2)}</b><br>`
            }
            // view_area_window2_1.innerHTML += `<br>Mês ${i + 1}, Montante: <b>${amount.toFixed(2)}</b>`;
        }
        const realValue = investValue * (time * 12);
        const profitCumpound = amount - realValue;
        view_area_window2_1.innerHTML += `<h3>Lucro: R$${profitCumpound.toFixed(2)}</h3>`;

    // AO MÊS
    }else if (checkTime == 'month') {        
        for (let i = 0; i < time; i++){
            if (i == 0) {
                amount = investValue;
                // amount += (amount * rate);
            }else{
                amount = (amount * rate) + investValue;
            }
            view_area_window2_1.innerHTML += `Mês ${i + 1}, Montante: <b>${amount.toFixed(2)}</b><br>`;
        }
        const realValue = investValue * time;
        const profitCumpound = amount - realValue;
        view_area_window2_1.innerHTML += `<h3>Lucro: R$${profitCumpound.toFixed(2)}</h3>`;
    }


    // CALCULO JUROS SIMPLES

    view_area_window2_2.innerHTML = `<h3>Juros simples</h3>`;

    amount = investValue;
    for (let i = 0; i < time; i++) {
        if (i == 0){
            rateMonth = (investValue * rate) - investValue;
        }else{
            amount = (amount + rateMonth) + investValue;
        }
        view_area_window2_2.innerHTML += `<br>Mês ${i + 1}, Montante: <b>${amount.toFixed(2)}</b>`;
    }

    const profitSimple = amount - realValue;
    view_area_window2_2.innerHTML += `<h3>Lucro: R$${profitSimple.toFixed(2)}</h3>`;  
}