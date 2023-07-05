<template>
    <div class="homecontainer">
        <div class="homenav">
            <ul>
                <li @click="scrollTo('homepic')">
                    <div class="navigation"></div>
                </li>
                <li @click="scrollTo('homepic2')">
                    <div class="navigation"></div>
                </li>
            </ul>
        </div>

        <div class="homepic" ref="homepic">
            <img src="https://picsum.photos/1600/800">
        </div>
        <router-link to="/ShopPage"><button>go to shop</button></router-link>

        <div class="homepic2" ref="homepic2">
            <div class="inform1">
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <span class="material-symbols-outlined">
                    local_shipping
                </span>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel est, rerum accusamus, id, assumenda dolorum
                    quaerat recusandae harum esse molestiae quisquam blanditiis. At est dolore animi, dignissimos
                    repellendus magnam atque.</p>
            </div>

            <div class="inform2">
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <span class="material-symbols-outlined">
                    menu_book
                </span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id amet dolore aliquam fugit nobis voluptatem
                    vitae velit doloribus est debitis molestiae adipisci, minima alias quo ipsa aspernatur dignissimos.
                    Itaque, enim?</p>
            </div>

            <div class="inform3">
                <link rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
                <span class="material-symbols-outlined">
                    package
                </span>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione nemo animi assumenda. Eveniet
                    voluptatibus fuga quos quam et velit, in reprehenderit explicabo, voluptas deleniti ex amet minima atque
                    veniam molestiae?</p>
            </div>
        </div>

    </div>
</template>
  
<script>
import { RouterLink } from 'vue-router';


export default {
    components: { RouterLink },
    name: "HomePage",
    data() {
        return {
            slide: 0,
            sliding: null,
        };
    },

    methods: {
        scrollTo(pos) {
            this.$refs[pos].scrollIntoView({ behavior: "smooth" });
        },
    },

    mounted() {
        this.$nextTick(() => {
            window.scrollTo(0, top)
        })
    }
}



</script>
 
<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}

img {
    height: 70vh;
}


/* #region############################################## slide  ##################################################### */

.homenav {
    position: fixed;
    top: 50%;
    right: 10px;
    z-index: 999;
}

.navigation {
    width: 10px;
    height: 10px;
    background-color: rgba(192, 192, 192, 1);
    margin: 10px 0px;
}

.navigation:hover {
    cursor: pointer;
    background-color: #fff;
}

/*#endregion ####################################### */

/* #region############################################## homepic  ##################################################### */
.homecontainer {
    background-color: #FBF3DE;
    position: relative;
    width: 100%;
    height: 100vh;
    min-width: 767px;
}

.homecontainer button {
    color: #fff;
    background-color: #000;
    position: absolute;
    padding: 10px 10px;
    right: 30%;
    bottom: 40%;
    border: #ffffff 1px solid
}

.homecontainer button:hover {
    background-color: #fff;
    color: black
}

.homepic {
    position: relative;
    top: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}

/*#endregion ####################################### */

/* #region############################################## homepic2  ##################################################### */
.homepic2 {
    height: 70vh;
    background-color: inherit;
    flex-wrap: nowrap;
    justify-content: space-around;
    display: flex;
}

.inform1,
.inform2,
.inform3 {
    padding: 10px;
    flex-wrap: wrap;
    height: 50vh;
    width: 30%;
}

.inform1,
.inform2,
.inform3,
span {
    justify-content: center;
    display: block;
    font-size: 24px;
}

.inform1,
.inform2,
.inform3,
p {
    display: flex;
    flex-wrap: wrap;
}

.material-symbols-outlined {
    font-size: 100px;
    font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48px
}


/*#endregion ####################################### */

/*#endregion ####################################### */</style>
