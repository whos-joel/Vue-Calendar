<template>
    <div class="year-selector">
            <!-- <div class="btn-container">
               
                    <a href="#" @click="previousYear()" class="btn">
                        &lt;
                    </a>
                
               
                    <a href="#" @click="nextYear()" class="btn">
                        &gt;
                    </a>
               
            </div> -->
            <div class="years">
                <div v-for="year in years"
                    :key="year.id" class="year">
                    <a href="#"
                        :class="{'selected' : year.isSelected}"
                        @click="setYear(year.value)">
                        {{year.value}}
                    </a>
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

    get years() {
        const data: object[] = [];
        for (let i = 0; i < 16; i++) {
                const id = i;
                const val = (this.value + id) + (this.page * 16);
                data[i] = {
                    id,
                    value: val,
                    isSelected: val === this.value,
                };
        }
        return data;
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
        this.page = 0;
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



