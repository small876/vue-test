<template>
    <div class="homecontainer">  
        <div>
            <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000"
                fade
                indicators
                img-width="1024"
                img-height="480"
            >
                <b-carousel-slide
                caption="First Slide"
                img-src="https://picsum.photos/1024/480/?image=10"
                ></b-carousel-slide>
                <b-carousel-slide
                caption="Second Slide"
                img-src="https://picsum.photos/1024/480/?image=12"
                ></b-carousel-slide>
                <b-carousel-slide
                caption="Third Slide"
                img-src="https://picsum.photos/1024/480/?image=22"
                ></b-carousel-slide>
            </b-carousel>
        </div>

        <div class="intro">
            <b-card-group deck>
                <b-card
                    title="Card Title" 
                    tag="article"
                    style="max-width: 40rem;min-width: 25rem"
                    class="mb-2 p-2"
                >
                <link rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                    <span class="material-symbols-outlined">
                        <h2>local_shipping</h2>
                    </span>
                    <b-card-text>
                        <h4>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor repellendus, facilis eum voluptas corrupti vero assumenda, perferendis natus at laboriosam dolorem nisi sunt voluptate quidem! Doloremque cumque tempore in illo?
                            </h4>
                    </b-card-text>
                </b-card>

                <b-card
                    title="Card Title" 
                    tag="article"
                    style="max-width: 40rem;min-width: 30rem"
                    class="mb-2 p-2"
                >
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <span class="material-symbols-outlined">
                    <h2> package</h2>
                </span>
                    <b-card-text>
                        <h4>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor repellendus, facilis eum voluptas corrupti vero assumenda, perferendis natus at laboriosam dolorem nisi sunt voluptate quidem! Doloremque cumque tempore in illo?
                            </h4>
                    </b-card-text>
                </b-card>
            
                <b-card
                    title="Card Title" 
                    tag="article"
                    style="max-width: 40rem;min-width: 30rem"
                    class="mb-2 p-2"
                >
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <span class="material-symbols-outlined">
                    <h2>menu_book</h2>
                </span>
                    <b-card-text>
                        <h4>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor repellendus, facilis eum voluptas corrupti vero assumenda, perferendis natus at laboriosam dolorem nisi sunt voluptate quidem! Doloremque cumque tempore in illo?
                            </h4>
                    </b-card-text>
                </b-card>
            </b-card-group>
        </div>       
    </div>
    
</template>
  
<script>



export default {

    name: "HomePage",
    data() {
        return {
            slide: 0,
            sliding: null,
        };
    },
}



</script>
 
<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}

.intro{
    padding: 10px;
    background-color: #615d5d;
}


</style>
