// Sample data for food items (you can replace it with your actual data)
const foodItems = [
    { name: "Cheese Pizza", price: 849.00, imgSrc: "https://media.istockphoto.com/id/1280329631/photo/italian-pizza-margherita-with-tomatoes-and-mozzarella-cheese-on-wooden-cutting-board-close-up.jpg?s=612x612&w=0&k=20&c=CFDDjavIC5l8Zska16UZRZDXDwd47fwmRsUNzY0Ym6o=" },
    { name: "Pepperoni Pizza", price: 949.00, imgSrc: "https://media.istockphoto.com/id/521403691/photo/hot-homemade-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=PaISuuHcJWTEVoDKNnxaHy7L2BTUkyYZ06hYgzXmTbo=" },
    { name: "Vegetarian Pizza", price: 899.00, imgSrc: "https://media.istockphoto.com/id/181175167/photo/pizza.jpg?s=612x612&w=0&k=20&c=OyXOr0gffQOpa-Dn94I_DOsOcEVWTmbl9kR_M25o1v4=" },
    { name: "Margherita Pizza", price: 769.00, imgSrc: "https://media.istockphoto.com/id/1393150881/photo/italian-pizza-margherita-with-cheese-and-tomato-sauce-on-the-board-on-grey-table-macro-close.jpg?s=612x612&w=0&k=20&c=kL0Vhg2XKBjEl__iG8sFv31WTiahdpLc3rTDtNZuD2g=" },
    { name: "Hawaiian Pizza", price: 1029.00, imgSrc: "https://media.istockphoto.com/id/185009286/photo/hawaiian-pizza.jpg?s=612x612&w=0&k=20&c=2tU2JUXr3UCGnuRNKhZGGOwbb6AOC2eckp_TLUf-pdw=" },
    { name: "BBQ Chicken Pizza", price: 1089.00, imgSrc: "https://media.istockphoto.com/id/489593343/photo/bbq-chicken-pizza.jpg?s=612x612&w=0&k=20&c=Lx264tmxrp3wpcwLdRdJyIvi3Yxm56jj2TW5WeoU8FI=" },
    { name: "Meat Lovers Pizza", price: 1149.00, imgSrc: "https://media.istockphoto.com/id/1248287329/photo/savory-homemade-meat-lovers-pizza.jpg?s=612x612&w=0&k=20&c=ozXnuE1wYhYHJ75jwR9dLIodSbM2CFupeA9sxhAqtjY=" },
    { name: "Supreme Pizza", price: 1219.00, imgSrc: "https://media.istockphoto.com/id/153784617/photo/supreme-pizza-slice-lift.jpg?s=612x612&w=0&k=20&c=Et5uDUJYv3sqDitb1jnUbnGrxhn015foBX_BS-1NFxs=" },
    { name: "Buffalo Chicken Pizza", price: 1089.00, imgSrc: "https://media.istockphoto.com/id/1215800380/photo/homemade-buffalo-chicken-pizza.jpg?s=612x612&w=0&k=20&c=ZXVcxuryo7YZRX5qX4npwYFD08OVh3iu5b1A8dFEMxc=" },
    { name: "Mushroom Pizza", price: 899.00, imgSrc: "https://media.istockphoto.com/id/531064304/photo/white-pizza.jpg?s=612x612&w=0&k=20&c=8aiwmytrwerN94nb1Ja_sXcTZB3xFV6z3RTVtOv2RGQ=" }
];

// Function to display food items in the menu section
function displayMenu() {
    const menuSection = document.getElementById("menu");
    menuSection.innerHTML = "";

    foodItems.forEach(item => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <img src="${item.imgSrc}" alt="${item.name}" class="box-img">
            <h2>${item.name}</h2>
            <span>₹${item.price.toFixed(2)}</span>
            <button class="order-btn">Order</button>
        `;
        menuSection.appendChild(box);
    });
}

// Function to handle adding food items to the order
function addToOrder(itemName, itemPrice) {
    const orderList = document.getElementById("order-list");
    const listItem = document.createElement("li");
    listItem.innerHTML = `${itemName}: ₹${itemPrice.toFixed(2)}`;
    orderList.appendChild(listItem);

    // Update total cost
    updateTotalCost(itemPrice);
}

// Function to update the total cost
function updateTotalCost(itemPrice) {
    const totalCostElement = document.getElementById("total-cost");
    const currentTotalCost = parseFloat(totalCostElement.innerText.split(":")[1].trim().substring(1));
    const newTotalCost = currentTotalCost + itemPrice;
    totalCostElement.innerText = `Total Cost: ₹${newTotalCost.toFixed(2)}`;
}

// Function to handle order button click
function handleOrderButtonClick(event) {
    const button = event.target;
    const box = button.closest(".box");
    const itemName = box.querySelector("h2").innerText;
    const itemPrice = parseFloat(box.querySelector("span").innerText.substring(1));
    addToOrder(itemName, itemPrice);
}

// Event listener for order buttons
document.addEventListener("click", function(event) {
    if (event.target.classList.contains("order-btn")) {
        handleOrderButtonClick(event);
    }
});

// Display initial menu
displayMenu();
