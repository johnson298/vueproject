<template>
  <div>
    <vs-row vs-w="12">
      <vs-col vs-w="12">
        <vs-input
          label="Giá tiền (vnđ) *"
          class="mb-5 w-full"
          type="number"
          v-model="expense.amount"
        />
      </vs-col>
      <vs-col vs-w="12">
        <div class="note *">
          <label class="vs-input--label">Ghi chú</label>
        </div>
        <vs-textarea
          v-model="expense.note"
          style="border: solid 1px #dddddd; background: #fff"
          name="note"
          type="text"
          class="w-full"
          :rows="5"
          placeholder="nhập ghi chú"
        />
      </vs-col>
      <vs-col vs-w="12">
        <h5>
          <span class="text-primary">Thành tiền:</span>
          {{ DOCSO(expense.amount) }}
        </h5>
      </vs-col>

      <vs-col class="mt-5" vs-w="12" vs-type="flex" vs-justify="flex-end">
        <vs-button
          :disabled="(expense.amount&&expense.note) ? false : true"
          class="ml-3 vs-con-loading__container"
          type="filled"
          color="primary"
          @click="createExpense"
          ref="addButton"
          id="btn-loading"
        >Tạo chi</vs-button>
        <vs-button
          class="ml-3"
          type="filled"
          color="danger"
          @click="initValues(); $emit('update:active',false)"
        >Hủy</vs-button>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  props: {
    callback: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      disabled: "disabled",
      loading: false,
      expense: {
        note: null,
        type: 2,
        amount: 0,
        quantity: 0
      }
    };
  },
  computed: {
    branchId() {
      return this.$store.state.getBranchId;
    }
  },
  methods: {
    initValues() {
      this.expense = {
        note: "",
        type: 2,
        amount: 0
      };
    },
    createExpense() {
      this.$vs.loading({
        background: "#1E6DB5",
        color: "#fff",
        container: "#btn-loading",
        scale: 0.45
      });
      this.$http
        .post(`branches/${this.branchId}/invoices?type=2`, {
          amount: this.expense.amount,
          note: this.expense.note,
          type: 2
        })
        .then(() => {
          this.$vs.notify({
            title: "Đã thêm mới thành công",
            text: "OK",
            iconPack: "feather",
            icon: "fa fa-lg fa-check-circle",
            color: "success"
          });
          this.callback();
          this.initValues();
          this.$emit("closePopupExpense", false);
        })
        .catch(error => {
          let thisIns = this;
          thisIns.checkResponRequest(error.response.data, null, null, "Thêm mới thất bại");
        })
        .finally(() => {
          this.$vs.loading.close("#btn-loading > .con-vs-loading");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.table-border {
  .vs-table--tbody {
    border: none;

    table {
      th {
        border: 1px solid #ccc;
      }

      td {
        border: 1px solid #ccc;
      }
    }
  }
}

.d-flex {
  display: flex;
}

.d-block {
  display: block;
}

.pl-0 {
  padding-left: 0;
}

.border {
  border: 1px solid #ccc;
}
</style>
