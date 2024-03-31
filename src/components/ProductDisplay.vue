<template>
  <div class="page-container" >
    <div class="background-container" :style="backgroundStyle" v-if="(product.category === 'men\'s clothing' || product.category === 'women\'s clothing')">
      <img src="../../public/bg-pattern.svg" alt="" class="bg-pattern">
    </div>
    <div class="background-container" :style="backgroundStyle" v-if="(product.category !== 'men\'s clothing' && product.category !== 'women\'s clothing')">
    </div>
    <div class="product-card" v-if="!loading && (product.category === 'men\'s clothing' || product.category === 'women\'s clothing')">
      <div class="image">
        <img :src="product.image" alt="Product Image">
      </div>
      <div class="card-content">
        <div class="details">
          <h2>{{ product.title }}</h2>
          <div class="details-row">
            <p >{{ product.category }}</p>
            <p v-if="product.rating">
              <span v-if="product.rating.rate === 0">
                {{ product.rating.rate }}/5 ⚪⚪⚪⚪⚪
              </span>
              <span v-else-if="product.rating.rate >= 0 && product.rating.rate < 1">
                <span v-if="product.category === 'men\'s clothing'">
                  {{ product.rating.rate }}/5 🔵⚪⚪⚪⚪
                </span>
                <span v-else-if="product.category === 'women\'s clothing'">
                  {{ product.rating.rate }}/5 🟣⚪⚪⚪⚪
                </span>
              </span>
              <span v-else-if="product.rating.rate >= 1 && product.rating.rate < 2">
                <span v-if="product.category === 'men\'s clothing'">
                  {{ product.rating.rate }}/5 🔵🔵⚪⚪⚪
                </span>
                <span v-else-if="product.category === 'women\'s clothing'">
                  {{ product.rating.rate }}/5 🟣🟣⚪⚪⚪
                </span>
              </span>
              <span v-else-if="product.rating.rate >= 2 && product.rating.rate < 3">
                <span v-if="product.category === 'men\'s clothing'">
                  {{ product.rating.rate }}/5 🔵🔵🔵⚪⚪
                </span>
                <span v-else-if="product.category === 'women\'s clothing'">
                  {{ product.rating.rate }}/5 🟣🟣🟣⚪⚪
                </span>
              </span>
              <span v-else-if="product.rating.rate >= 3 && product.rating.rate < 4">
                <span v-if="product.category === 'men\'s clothing'">
                  {{ product.rating.rate }}/5 🔵🔵🔵🔵⚪
                </span>
                <span v-else-if="product.category === 'women\'s clothing'">
                  {{ product.rating.rate }}/5 🟣🟣🟣🟣⚪
                </span>
              </span>
              <span v-else-if="product.rating.rate >= 4 && product.rating.rate <= 5">
                <span v-if="product.category === 'men\'s clothing'">
                  {{ product.rating.rate }}/5 🔵🔵🔵🔵🔵
                </span>
                <span v-else-if="product.category === 'women\'s clothing'">
                  {{ product.rating.rate }}/5 🟣🟣🟣🟣🟣
                </span>
              </span>
            </p>
          </div>
          <hr>
          <p class="description">{{ product.description }}</p>
          <div class="bottom-card">
            <hr>
            <p class="price">${{ product.price }}</p>
            <div class="buttons-row">
              <button @click="buyNow" v-if="(product.category === 'men\'s clothing' || product.category !== 'women\'s clothing')" class="buy-button-men">Buy Now</button>
              <button @click="buyNow" v-if="(product.category !== 'men\'s clothing' || product.category === 'women\'s clothing')" class="buy-button-women">Buy Now</button>
              <button @click="getPreviousProduct" class="prev-button">Back</button>
              <button @click="getNextProduct" v-if="(product.category === 'men\'s clothing' || product.category !== 'women\'s clothing')" class="next-button-men">Next</button>
              <button @click="getNextProduct" v-if="(product.category !== 'men\'s clothing' || product.category === 'women\'s clothing')" class="next-button-women">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- unavailable product -->
    <div v-else-if="!loading && product.category !== 'men\'s clothing' && product.category !== 'women\'s clothing'" class="unavailable-product">
      <div class="unavailable-card">
        <div class="sad-face"></div>
        <div class="content">
          <p class="unavailable-text">This product is unavailable to show</p>
          <div class="buttons-row">
            <button @click="getPreviousProduct" class="prev-button-unavailable">Back</button>
            <button @click="getNextProduct" class="next-button-unavailable">Next</button>
          </div>
        </div>
      </div>
    </div>

    <!-- skeleton loading -->
    <div v-else class="skeleton-loading">
      <div class="skeleton-image"></div>
      <div class="skeleton-details">
        <div class="skeleton-box"></div>
        <div class="skeleton-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            currentIndex: 0,
            loading: false,
            product: []
        }
    },
    methods: {
      async getNextProduct() {
      try {
        this.loading = true; // Set loading to true before making the request
        this.currentIndex = this.currentIndex < 20 ? this.currentIndex + 1 : 1;
        const response = await axios.get(
          `https://fakestoreapi.com/products/${this.currentIndex}`
        );
        this.product = response.data;
        this.loading = false; // Set loading to false after receiving the response
        console.log(response);
      } catch (error) {
        console.error('Error fetching product:', error);
        this.loading = false; // Set loading to false in case of error
      }
    },
    async getPreviousProduct() {
      try {
        this.loading = true; // Set loading to true before making the request
        this.currentIndex = this.currentIndex > 1 ? this.currentIndex - 1 : 20;
        const response = await axios.get(
          `https://fakestoreapi.com/products/${this.currentIndex}`
        );
        this.product = response.data;
        this.loading = false; // Set loading to false after receiving the response
        console.log(response);
      } catch (error) {
        console.error('Error fetching previous product:', error);
        this.loading = false; // Set loading to false in case of error
      }
    },
  },
    
  computed: {
    backgroundStyle() {
        if (this.product.category === "men's clothing") {
          return { background: 'url("data:image/svg+xml,%3Csvg width=\'1280\' height=\'548\' viewBox=\'0 0 1280 548\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'-3\' width=\'1283\' height=\'548\' fill=\'%23D6E6FF\'/%3E%3C/svg%3E")' };
        } else if (this.product.category === "women's clothing") {
          return { background: 'url("data:image/svg+xml,%3Csvg width=\'1280\' height=\'548\' viewBox=\'0 0 1280 548\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'-3\' width=\'1283\' height=\'548\' fill=\'%23FDE2FF\'/%3E%3C/svg%3E")' };
        } else {
          return { background: 'url("data:image/svg+xml,%3Csvg width=\'1280\' height=\'548\' viewBox=\'0 0 1280 548\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'-3\' width=\'1283\' height=\'548\' fill=\'%23D8D7D7\'/%3E%3C/svg%3E")' };
        }
    }
  },
  created() {
    this.getNextProduct();
  }
}

</script>

<style  scoped>
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 97vh;
  }
  .background-container {
    /* width: 100vw; Lebar layar penuh */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    z-index: -1;
  }

  .bg-pattern {
    width: 100%;
  }

  .product-card {
    width: 100%;
    width: 1100px;
    height: 600px;
    margin: auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: white; /* white background for the card */
    position: relative;
    display: flex; /* Added */
    justify-content: center; /* Added */
    align-items: center;
  }

  .card-content {
    display: flex;
    flex-direction: column; /* Ubah menjadi flex-direction: column */
    height: 600px;
    justify-content: space-between;
    /* background-color: #720060; */
  }

  .image {
    flex: 1;
  }

  .image img {
    width: 350px;
    height: 500px;
    border-radius: 5px;
  }

  .details {
    flex: 2; /* Menggunakan flexbox untuk menata tata letak */
    padding: 10px 40px;
    text-align: left; /* Tulisan dimulai dari kiri */
  }

  .details-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
  }

  .buttons-row {
    text-align: center;
  }

  .description {
    font-size: 18px;
    font-weight: 400;
  }

  .price {
    font-size: 24px;
    font-weight: 600;
  }

  h2 {
    font-size: 28px;
    font-weight: 600;
  }

  .bottom-card {
    position: absolute;
    bottom: 0;
    width: 90%;
    left: 5%;
    margin-bottom: 15px;
  }

  .buy-button-men {
    padding: 12px 20px;
    background-color: #002772;
    color: whitesmoke;
    border-radius: 5px;
    width: 46%;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
  }

  .buy-button-women {
    padding: 12px 20px;
    background-color: #720060;
    color: whitesmoke;
    border-radius: 5px;
    width: 46%;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
  }

  .prev-button {
    padding: 12px 20px;
    margin-left: 10px;
    border-radius: 5px;
    border-color: red;
    background-color: white;
    color: darkred;
    width: 25%;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
  }

  .next-button-men {
    padding: 12px 20px;
    margin-left: 10px;
    border-radius: 5px;
    border-color: #002772;
    background-color: white;
    color: #002772;
    width: 25%;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
  }

  .next-button-women {
    padding: 12px 20px;
    margin-left: 10px;
    border-radius: 5px;
    border-color: #720060;
    background-color: white;
    color: #720060;
    width: 25%;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
  }

  .buy-button-men:active,
  .buy-button-women:active,
  .prev-button:active,
  .next-button-men:active,
  .next-button-women:active {
    opacity: 0.7; /* Mengubah opacity menjadi 70% saat tombol diklik */
  }

  .unavailable-product {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
  }

  .unavailable-product {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .unavailable-card {
    width: 1100px;
    height: 600px;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-image: url('../../public/sad-face.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
  }

  .next-button-unavailable {
    padding: 12px 20px;
    margin-left: 10px;
    border-radius: 5px;
    border-color: #002772;
    background-color: white;
    color: #002772;
    width: 40%;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
  }

  .prev-button-unavailable {
    padding: 12px 20px;
    margin-left: 10px;
    border-radius: 5px;
    border-color: red;
    background-color: white;
    color: darkred;
    width: 40%;
    cursor: pointer;
    font-weight: 600;
    font-size: 20px;
  }

  .unavailable-text {
    margin-top: 20px;
    font-size: 20px;
  }

  /* Adjustments for product-card */
  .product-card {
    position: relative;
    z-index: 1;
  }

  .card-content {
    position: relative;
    z-index: 1;
  }

  .skeleton-loading {
    width: 100%;
    max-width: 1100px;
    height: 600px;
    margin: auto;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    animation: pulse 1.5s infinite alternate;
    display: flex;
  }

  .skeleton-image {
    width: 350px;
    height: 500px;
    border-radius: 5px;
    background-color: #dcdcdc;
  }

  .skeleton-details {
    flex: 1;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }

  .skeleton-box {
    width: 100%;
    height: 40%;
    margin-bottom: 20px;
    background-color: #dcdcdc;
  }

  @keyframes pulse {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.5;
    }
  }

</style>