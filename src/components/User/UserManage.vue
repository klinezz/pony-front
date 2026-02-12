<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import { ref, onMounted } from "vue";

const products = ref([
  {
    id: "1000",
    code: "f230fh0g3",
    name: "Bamboo Watch",
    description: "Product Description",
    image: "bamboo-watch.jpg",
    price: 65,
    category: "Accessories",
    quantity: 24,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
]);
const size = ref("small");
</script>

<template>
  <div>
    <div class="viewport">
      <h2 class="menu_title">사용자 관리</h2>
    </div>

    <div>
      <DataTable
        :value="products"
        stripedRows
        size="small"
        :paginator="true"
        :rows="10"
        tableStyle="min-width: 50rem"
      >
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" header="Quantity"></Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
