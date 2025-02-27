//  cursor
const cursor = document.querySelector(".cursor");
const cursorTrail = document.querySelector(".cursor-trail");

// Smooth follow effect using GSAP
document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
    gsap.to(cursorTrail, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power3.out" });
});

// Click Animation
document.addEventListener("click", () => {
    gsap.to(cursor, { scale: 1.5, duration: 0.1, ease: "power2.out", yoyo: true, repeat: 1 });
    gsap.to(cursorTrail, { scale: 2, duration: 0.3, opacity: 0, ease: "power2.out", yoyo: true, repeat: 1 });
});
/////////   toggle button   /////////////
const menuIcon = document.getElementById('menuIcon');
const menuList = document.getElementById('menuList');

menuIcon.addEventListener('click', () => {
  if (menuList.style.maxHeight === '0px' || menuList.style.maxHeight === '') {
    menuList.style.maxHeight = '550px';
    console.log(menuIcon);
    console.log(menuList);

  } else {
    menuList.style.maxHeight = '0px';
  }
});

// dessert apis
let noBakeDes = [
    {
        title: 'Apam Bali',
        img: 'https://www.foodandwine.com/thmb/3c9F_orac_iLt7eGWo440K8s3zI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/almond-affogato-FT-RECIPE1121-0dd7cafd1e8c496097adec7470a3a064.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Desired able',
        img: 'https://www.foodandwine.com/thmb/jadOZn632B5hvh9mY1grm2TX2lA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sour-cherry-cheesecake-trifle-with-black-pepper-and-saba-ft-MAG1218-d651c51a93d1409098eb8f01ba405b64.jpg',
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Eggless clasical',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwVA2ZIxqLAMg7-pIRBTL3SyEyipx0Hmoitg&s',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://nibbleanddine.com/wp-content/uploads/2019/04/Mocha-Oreo-No-Bake-Dessert-Thumbnail.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://hips.hearstapps.com/hmg-prod/images/milk-n-cookies-icebox-cake-vertical3-6658c4fc232ec.jpg?crop=0.604xw:0.725xh;0.376xw,0.0395xh&resize=980:',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://www.happyfoodstube.com/wp-content/uploads/2018/08/raspberry-oreo-no-bake-dessert-image.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rZHGbTtbE8xy7igqEBBpLaFV7kgjPW5dHQ&s',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/221738.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://www.allrecipes.com/thmb/L39VB-xxXrAd7dNVh2U8FYTo9Kg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7499206-mini-no-bake-cheesecake-DDMFS-beauty-2x1-BG-9367-287e837a04a1401396a2bc249023a0a6.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://images.immediate.co.uk/production/volatile/sites/30/2023/10/Mince-pie-cheesecake-da1c314.jpg?quality=90&resize=556,505', serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    }
]

// call api for noBakedes
let desCard = document.querySelector('#dessertCard')
const displayCards = (card) => {
    desCard.innerHTML = ''
    card.forEach((products) => {
        console.log(noBakeDes);
        let newCard = document.createElement('div')
        newCard.setAttribute = ('class', 'newDiv')
        newCard.innerHTML = `
             <div class="dessertCard">
                <img class="dessertCardImg" src="${products.img}" alt="">
                <h3>${products.title}</h3>
                <p class = "mt-4">${products.prepration}</p>
                <button class="desBtn">Get Recipe</button>
            </div>
        `
        desCard.appendChild(newCard)
    })
}
displayCards(noBakeDes)
let iceCreams = [
    {
        title: 'Apam Bali',
        img: 'https://www.foodandwine.com/thmb/3c9F_orac_iLt7eGWo440K8s3zI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/almond-affogato-FT-RECIPE1121-0dd7cafd1e8c496097adec7470a3a064.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Desired able',
        img: 'https://www.foodandwine.com/thmb/jadOZn632B5hvh9mY1grm2TX2lA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sour-cherry-cheesecake-trifle-with-black-pepper-and-saba-ft-MAG1218-d651c51a93d1409098eb8f01ba405b64.jpg',
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Eggless clasical',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwVA2ZIxqLAMg7-pIRBTL3SyEyipx0Hmoitg&s',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://nibbleanddine.com/wp-content/uploads/2019/04/Mocha-Oreo-No-Bake-Dessert-Thumbnail.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://hips.hearstapps.com/hmg-prod/images/milk-n-cookies-icebox-cake-vertical3-6658c4fc232ec.jpg?crop=0.604xw:0.725xh;0.376xw,0.0395xh&resize=980:',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://www.happyfoodstube.com/wp-content/uploads/2018/08/raspberry-oreo-no-bake-dessert-image.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6rZHGbTtbE8xy7igqEBBpLaFV7kgjPW5dHQ&s',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/221738.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://www.allrecipes.com/thmb/L39VB-xxXrAd7dNVh2U8FYTo9Kg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/7499206-mini-no-bake-cheesecake-DDMFS-beauty-2x1-BG-9367-287e837a04a1401396a2bc249023a0a6.jpg',
        serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    },
    {
        title: 'Apam Bali',
        img: 'https://images.immediate.co.uk/production/volatile/sites/30/2023/10/Mince-pie-cheesecake-da1c314.jpg?quality=90&resize=556,505', serving: 5,
        ingredients: `Nonstick cooking spray, 2 cups (240g) all-purpose flour, 1 (20-ounce) can crushed pineapple, undrained
            1 cup (200g) granulated sugar
            2 large eggs
            1 teaspoon vanilla extract
            1 teaspoon baking soda
            1/2 teaspoon kosher salt`,
        prepration: `Wanna Enjoy something special? This recipe will make you Desireable in your family
            with lots of affection and Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
             quibusdam minus molestias facere similique, ad accusantium!
             Iusto necessitatibus similique voluptatibus ex voluptas autem ipsum nulla harum, in inventore deleniti quaerat.`
    }
]
// call api for icecream
let iceCream = document.querySelector('#icecreams')
const iceCreamCard = (card) => {
    iceCream.innerHTML = ''
    card.forEach((products) => {
        console.log(iceCreams);
        let newCard = document.createElement('div')
        newCard.setAttribute = ('class', 'newDiv')
        newCard.innerHTML = `
             <div class="dessertCard">
                <img class="dessertCardImg" src="${products.img}" alt="">
                <h3>${products.title}</h3>
                <p class = "mt-4">${products.prepration}</p>
                <button class="desBtn">Get Recipe</button>
            </div>
        `
        iceCream.appendChild(newCard)
    })
}
iceCreamCard(iceCreams)