// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0;
let mealsId = 0;
let customersId = 0;
let deliveriesId = 0;

class Neighborhood {
  constructor(name){
    this.name = name;
    this.id = neighborhoodId++;
    store.neighborhoods.push(this);
  }


  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }


  customers(){
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }


  meals(){
    let meals = this.deliveries().map(delivery => delivery.meal());
    return meals.filter(function(meal, index, meals) {
      return meals.indexOf(meal) === index;
    });
  }
}

class Customer {

  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }


  meals(){
    return this.deliveries().map(delivery => delivery.meal())
  }


  totalSpent(){
    return this.meals().reduce(function (accumulator, meal){
      return accumulator + meal.price;
    }, 0);
  }
}


class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }


  deliveries(){
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers(){
    return this.deliveries().map(delivery => delivery.customer())
  }

  static byPrice() {
    return store.meals.sort(function (meal1, meal2){
      return meal2.price > meal1.price
    });
  }
  
}