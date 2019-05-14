<template>
    <div class="month-picker">
        <table>
            <tr>
                <td colspan="4">
                    <a href="#" @click="setYearView">
                        {{year}}
                    </a>
                </td>
            </tr>
            <tr v-for="(row, i) in months"
                :key="i">
                <td v-for="data in row"
                    :key="data.id">
                    <a href="#"
                        :class="{'selected' : data.isSelected}"
                        @click="$emit('input', data.value)">
                        {{data.name}}
                    </a>
                </td>
            </tr>
        </table>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class MonthPicker extends Vue {

    @Prop(Number)
    public value!: number;

    @Prop(Number)
    public year!: number;

    get monthName(){
        return moment().month(this.value).format("MMMM");
    }

    get months() {
        const data: object[][] = [];
        for (let i = 0; i < 3; i++) {
            data[i] = [];
            for (let j = 0; j < 4; j++) {
                const val = j + (i * 4);
                data[i][j] = {
                    id: val,
                    value: val,
                    name: moment().month(val).format('MMM'),
                    isSelected: val === this.value,
                };
            }
        }
        return data;
    }

    @Emit("view-change")
    setYearView(){
        return "year"
    }
}
</script>

<style lang="less">
    .month-picker{
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
