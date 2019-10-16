<template>
<div>
    <vs-row vs-w="12">
        <vs-col vs-w="12">
            <vs-row class="mt-5">
                <vs-col vs-w="12" class="p-0 mb-5">
                    <vs-input label="Tên bài học" placeholder="Nhập tên bài học" class="w-full"/>
                </vs-col>
                <vs-col vs-w="12" class="p-0 mb-5">
                    <vs-input label="Đường dẫn khóa học" placeholder="Nhập đường dẫn video" class="w-full"/>
                </vs-col>
                <vs-col vs-w="12" class="p-0 mb-5">
                    <div class="note"><label class="vs-input--label">Ghi chú</label></div>
                    <vs-textarea style="border: solid 1px #dddddd" name="description" type="text" class="w-full" :rows="5" placeholder="Nhập mô tả cho bài học" />
                </vs-col>
            </vs-row>
        </vs-col>
        <vs-col class="mt-5" vs-w='12' vs-type="flex" vs-justify="flex-end">
            <vs-button class="ml-3" type="filled" color="primary">Thêm mới</vs-button>
            <vs-button class="ml-3" type="filled" color="danger" @click="$emit('update:active',false)">Hủy</vs-button>
        </vs-col>
    </vs-row>
</div>
</template>

<script>
export default {
  data() {
    return {
                
    };
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
    display: block
}

.pl-0 {
    padding-left: 0;
}

.border {
    border: 1px solid #ccc;
}
</style>
