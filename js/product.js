function askUrl() {
	fetch("http://localhost:3000/api/products")

  	.then(function(res) {
    	if (res.ok) {
      	return res.json();
    	}
  	})

  	.then(function (items) {
  		let params = (new URL(document.location)).searchParams;
		let id = params.get('id');
		console.log(id);

		function search(items) {
			for (var i = 0; i <= items.length; i++) {
				if(items[i]._id == id){
					console.log(i)
					return i;
				}
			}
		}

		let img = document.createElement("img");
		img.src = items[search(items)].imageUrl;
      	img.alt = items[search(items)].altTxt;

		let color=  items[search(items)].colors;
		let price=0;

		function choice(colors) {
			for (var i = 0; i <= colors.length-1; i++) {
				console.log(colors[i]);
				let choix = document.createElement("option");
				choix.value = colors[i];
				document
					.getElementById("colors")
					.appendChild(choix)
					.innerText = colors[i];
			}
		}     	

		choice(color);

      	document
			.getElementsByClassName("item__img")[0]
        	.appendChild(img);

        document
        	.getElementById("title")
        	.innerText = items[search(items)].name;

        document
        	.getElementById("price")
        	.innerText = items[search(items)].price;

        document
        	.getElementById("description")
        	.innerText = items[search(items)].description;


        document
		  .getElementById("colors")
		  .addEventListener("change", function(e){
		  	let couleurs = e.target.value;
		  })

		console.log(couleurs);


		document
		  	.getElementById("addToCart")
			.addEventListener("click", function(d){
				d.preventDefault();
  				d.stopPropagation();

				let product_min = localStorage.getItem("products")
		    	let produit = JSON.parse(product_min)
		        let produits = {
		        	produit:produit,
		        	id:id, 
		        	price: items[search(items)].price,
		        	couleurs:couleurs,

		        }
		        let product = JSON.stringify(produits);
		       	localStorage.setItem("products", product);
			})

		

		
  	})

  	.catch(function(err) {
    // Une erreur est survenue
  });
	
}

askUrl();