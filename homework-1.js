const readline = require('node:readline/promises')

function ticketPrice(category) {

  switch (category) {
    case 1: {
      return 300
    }
    case 2: {
      return 500
    }
    case 3: {
      return 900
    }
    default:
      return 0
  }
}

function maxTickets(budget, price) {

  if (price<=0) return 0

  let countTicket = 0
  while (budget>=price){
    budget-=price
    countTicket++
  }
  return countTicket
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category)

  if (price === 0) {
    console.log('Неизвестная категория билета')
    return
  }
  console.log(`Категория ${category}, билет ${ticketPrice(category)} руб., бюджет ${budget} руб.: можно купить ${maxTickets(budget, ticketPrice(category))} шт.`)
}

function deliveryPrice(distance, total){

  if (total>=3000 || distance<=3){
    return 0
  }
  else if( distance<=10){
    return 200
  }
  else{
    return 200+(distance-10)*25
  }

}

function printDelivery(distance, total){

  if (distance<=0 || total<=0){
    console.log('Некорректные данные')
    return 
  }
  console.log(`Расстояние ${distance} км., заказ ${total} руб.: доставка ${deliveryPrice(distance,total)} руб.`)
}

function printSteps(height){

  if (height<=0){
    console.log(`Такой высоты лестница не строится`)
    return
  }
  
  let countOfStep=0
  for (let i=1; i<=height; i++){

    if (i===4) continue

    if (i>10){
      console.log(`Дальше лестница не построена`)
      break
    }

    console.log(`Ступень ${i}`)
    countOfStep++
  }

  console.log(`Всего построено: ${countOfStep}`)

}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  console.log('Выберите задачу')
  console.log('1 – билетная касса')
  console.log('2 – доставка заказа')
  console.log('3 – лестница')

  const action = Number(await rl.question('Ваш выбор: '))

  switch (action) {
    case 1: {
      const category = Number(await rl.question('Категория билета: '))
      const budget = Number (await rl.question('Бюджет: '))
      printTicketResult(category, budget)
      break
    }
    case 2: {
      const distance = Number(await rl.question('Расстояние: '))
      const total = Number(await rl.question('Сумма заказа: '))
      printDelivery(distance, total)
      break
    }
    case 3: {
      const height = Number(await rl.question('Высота лестницы: '))
      printSteps(height)
      break
    }
    default:
      console.log('Такой задачи нет')
  }

  rl.close()
}

main()