<template>
    <div class="month-selector">
       <div class="btn-container">
            <a href="#" @click="setYearView">
                        {{year}}
            </a>
        </div>
                
         <div class="months">
             <div v-for="month in months"
                    class="month"
                    :key="month.id">
                    <a href="#"
                        :class="{'selected' : month.isSelected}"
                        @click="$emit('input', month.value)">
                        {{month.name}}
                    </a>
                </div>
        </div>          
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class MonthSelector extends Vue {

    @Prop(Number)
    public value!: number;

    @Prop(Number)
    public year!: number;

    get monthName(){
        return moment().month(this.value).format("MMMM");
    }

    get months() {
        const data: object[] = [];
        for (let i = 0; i < 12; i++) {
                data[i] = { 
                    id: i,
                    value: i,
                    name: moment().month(i).format('MMM'),
                    isSelected: i === this.value,
                };
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
    .btn-container{
        min-height: 40px;
         display: flex;
         justify-content: center;
         align-items: center;
    }
    .month-selector{
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        flex-direction: column;
        .months{
            display: flex;
            flex-wrap: wrap;
            flex-grow: 1;
            .month{
                width: calc(100% / 4);
                padding: 2px;

                a{
                    padding: 10px;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    text-decoration: none;
                    display: flex;
                    height: 100%;
                    justify-content: center;
                    align-items: center;
                    &.selected{
                        border-color: #009922;
                    }
                }
            }
        }
    }
</style>
