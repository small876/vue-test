<template>
    <div class="Launch-container">

        <b-card title="add item" bg-variant="light">
            <b-form-group label="name:" label-for="name" label-cols="3" label-align="center">
                <b-form-input id="name" v-model="name"></b-form-input>
            </b-form-group>

            <b-form-group label="price:" label-for="price" label-cols="3" label-align="center">
                <b-form-input id="price" v-model="price" min="0" lg="6" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="quantity:" label-for="quantity" label-cols="3" label-align="center">
                <b-form-input id="quantity" v-model="quantity" min="0" type="number"></b-form-input>
            </b-form-group>

            <b-form-group label="Intro:" label-for="Intro" label-cols="3" label-align="center">
                <b-form-textarea id="Intro" v-model="Intro" placeholder="Enter something..." rows="3"
                    max-rows="6"></b-form-textarea>
            </b-form-group>
        </b-card>
        <b-button class="mt-2" block @click="launch">submit</b-button>
    </div>
</template>
  
<script>
import { ItemLaunch } from '@/api/api'

export default {
    name: 'LaunchPage',
    data() {
        return {
            name: '',
            price: '',
            quantity: '',
            Intro: ''
        }
    },
    methods: {
        launch() {
            if (!this.name || !this.price || !this.quantity || !this.Intro) {
                alert('不得為空')
            } else {
                let itemdata = {
                    name: this.name,
                    price: this.price,
                    quantity: this.quantity,
                    intro: this.Intro,
                }
                console.log(itemdata)

                try {
                    ItemLaunch(itemdata)
                    this.$router.push({
                        path: 'admin'
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}



</script>
  
<style scoped></style>