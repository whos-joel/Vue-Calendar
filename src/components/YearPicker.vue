<template>
    <div class="year-picker">
        <table>
            <tr>
                <td colspan="2"></td>
                <td>
                    <a href="#" @click="previousYear()">
                        &lt;
                    </a>
                </td>
                <td>
                    <a href="#" @click="nextYear()">&gt;</a>
                </td>
            </tr>
            <tr v-for="(row, i) in years"
                :key="i">
                <td v-for="data in row"
                    :key="data.id">
                    <a href="#"
                        :class="{'selected' : data.isSelected}"
                        @click="setYear(data.value)">
                        {{data.value}}
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class YearPicker extends Vue {

    public page: number = 0;

    @Prop(Number)
    public value!: number;

    get years() {
        const data: object[][] = [];
        for (let i = 0; i < 4; i++) {
            data[i] = [];
            for (let j = 0; j < 4; j++) {
                const id = j + (i * 4);
                const val = (this.value + id) + (this.page * 16);
                data[i][j] = {
                    id,
                    value: val,
                    isSelected: val === this.value,
                };
            }
        }
        return data;
    }

    public previousYear() {
        this.page--;
    }

    public nextYear() {
        this.page++;
    }

    public setYear(val: number) {
        this.page = 0;
        this.$emit('input', val);
    }

    public created() {

    }
}
</script>

<style lang="less">
    .year-picker{
        table{
            td{
                a{
                    padding: 10px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    text-decoration: none;
                    display: block;
                    &.selected{
                        border-color: #009922;
                    }
                }
            }
        }
    }
</style>



