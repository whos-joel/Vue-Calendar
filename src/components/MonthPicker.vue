<template>
    <div class="month-picker">
        <table>
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
import moment from 'moment'

@Component
export default class MonthPicker extends Vue{
    
    @Prop(Number)
    value!:number;

    get months(){
        let data: Object[][] = [];
        for(var i = 0; i < 3; i++){
            data[i] = [];
            for(var j = 0; j < 4; j++){         
                var val = j + (i * 4);
                data[i][j] = {
                    id: val,
                    value: val,
                    name: moment().month(val).format("MMM"),
                    isSelected: val === this.value
                }
            }
        }
        return data;
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
