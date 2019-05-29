<template>
    <div class="year-selector">
            <div class="years">
                <div v-for="year in years"
                    :key="year.id" class="year">
                    <a v-if="year.isWithinRange"
                        href="#"
                        :class="{'selected' : year.isSelected}"
                        @click="setYear(year.value)">
                        {{year.value}}
                    </a>
                    <div v-else
                        class="greyed-out">
                        {{year.value}}
                    </div>
                </div>
            </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class YearPicker extends Vue {

    @Prop(Number)
    public page!: number;

    @Prop(Number)
    public value!: number;

    @Prop()
    public min?: Date;

    @Prop()
    public max?: Date;

    get years() {
        const data: object[] = [];
        for (let i = 0; i < 16; i++) {
                const id = i;
                const val = (this.value + id) + (this.page * 16);
                data[i] = {
                    id,
                    value: val,
                    isSelected: val === this.value,
                    isWithinRange: this.isWithinRange(val)
                };
        }
        return data;
    }

     isWithinRange(year:number):boolean{
        if(this.min && this.max)
            return this.isGreaterThanMin(year, this.min) && this.isLessThanMax(year, this.max)
        if(this.min)
            return this.isGreaterThanMin(year, this.min)
        if(this.max)
           this.isLessThanMax(year, this.max)
        return true;
    }

    isGreaterThanMin(year:number, min:Date):boolean{
        if(year >= min.getFullYear())
            return true;
        return false;
    }

    isLessThanMax(year:number, max:Date):boolean{
        if(year <= max.getFullYear())
            return true;
        return false;
    }

    @Emit("previousYear")
    public previousYear() {
        //this.page--;
    }

    @Emit("nextYear")
    public nextYear() {
        //this.page++;
    }

    public setYear(val: number) {
        this.$emit('input', val);
    }

    public created() {

    }
}
</script>

<style lang="less">
    .year-selector{
        width: 100%;
        height: 100%;
        position: absolute;
        display:flex;
        flex-direction: column;

        &.next{
            transform: translateX(100%);
        }

        &.previous{
            transform: translateX(-100%);
        }

        .years{
            display:flex;
            flex-grow: 1;
            flex-wrap: wrap;
            .year{
                width: calc(100% / 4);
                padding: 2px;
                a, .greyed-out{
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
                .greyed-out{
                    border-color: #eee;
                    color: #ccc;
                }
            }
        }
        .btn-container{
            justify-content: space-between;
            min-height: 70px;
            .btn{
                width: calc(100% / 4);
                padding: 2px;
                cursor: pointer;
                border: 1px solid #ccc;
                display: flex;
                cursor: pointer;
                margin: 2px;
                display: flex;
                height: 100%;
                justify-content: center;
                align-items: center;
                text-decoration: none;
            }
        }
    }
</style>



