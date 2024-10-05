//1 - Fetch, load, and show categories on html
//create load categories 
const loadCategories = () =>{
    // console.log('load categories')

    // fetch data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) =>res.json())
        .then((data)=>displayCategories(data.categories))
        .catch((error) => console.error(error));

};

// load videos 
const loadVideos = (searchText = "") =>{
    console.log('load videos')

    // fetch data 
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res) =>res.json())
        .then((data)=>displayVideos(data.videos))
        .catch((error) => console.error(error));

};


// load category list 
const loadCategoryVideo = (id) =>{
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) =>res.json())
        .then((data)=>{
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.error(error));
}

const removeActiveClass = ()=>{
    const buttons =  document.getElementsByClassName('btn-category');
    console.log(buttons);
    for (let btn of buttons){
        btn.classList.remove('active')
    }
}
// {category_id: '1001', category: 'Music'}

//create display categories
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('categories');

    categories.forEach(item => {
        // console.log(item)
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML=
        `
            <button id=btn-${item.category_id} onclick='loadCategoryVideo(${item.category_id})' class='btn btn-category' >
                ${item.category}
            </button>
        `;

        // button.classList = 'btn';
        // button.innerText = item.category; 
        categoryContainer.append(buttonContainer)
        
    });

}




// get time string 
const converter = (time)=>{
    const hour = parseInt( time/(3600));
    let remaining = time % 3600 ;
    const min = parseInt(remaining/60);
    return(`${hour}hrs ${min}min ago `);
};



const displayVideos = (videos) =>{

    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML =""


    if (videos.length == 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class ="min-h-[300px] flex flex-col gap-5 items-center">
            <img src="./Icon.png">
            <p class="text-2xl font-bold">Oops!! Sorry, There is no content here</p>
        </div>
    `;
        return
    }

    console.log(videos)
    videos.forEach(video => {
        // console.log(video);
        const card = document.createElement('div');
        card.classList ='card card-compact';
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="w-full h-full object-cover"
            src="${video.thumbnail}"
            alt="" />
            ${video.others.posted_date?.length == 0 ? "":`<span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">
                ${converter(video.others.posted_date)}
            </span>`}
            
        </figure>
        <div class='px-0 py-2 flex gap-4'>
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
            </div>

            <div class="">
                <h2 class="font-bold">${video.title}</h2>
                <div class= "flex items-center gap-2">

                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified == true ?`<img class="w-5" src=https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png /> `:''}
                    
                </div>

                <h2 class ="text-gray-400">${video.others.views}</h2>
                <button class="btn" onclick="loadDetails('${video.video_id}')" >Details</button>
            </div>
        </div>`
        videoContainer.append(card)


    });

}

const loadDetails = async (videoId)  =>{
    console.log(videoId)
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch (uri);
    const data = await res.json();
    displayDetails(data.video);
    

};

const displayDetails = (video) => {
    const detailsContainer = document.getElementById('modal-content');
    // way1 
    // document.getElementById('showModalData').click();

    // way2 
    document.getElementById('my_modal_5').showModal();
    detailsContainer.innerHTML= `
    <img src=${video.thumbnail}/>
        <p class= "p-2">${video.description}</p>
    `

}

document.getElementById('search-input').addEventListener('keyup',(e)=>{
    loadVideos(e.target.value);
})



loadCategories();

loadVideos();