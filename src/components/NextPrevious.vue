<template>
    <div class="btn-group">
            <div class="btn-container">
                <a v-if="!disablePrevious" href="#" class="btn previous" @click="previous">
                    &lt;
                </a>
            </div>
            <div v-if="info" class="btn-container info">
                <a href="#" class="btn info" @click="infoClick">
                    {{info}}
                </a>
            </div>
            <div class="btn-container">
                <a v-if="!disableNext" href="#" class="btn next" @click="next">
                    &gt;
                </a>
            </div>
        </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class NextPrevious extends Vue {
    @Prop(String)
    info!:string;

    @Prop({default:false})
    disableNext!:boolean;

    @Prop({default:false})
    disablePrevious!:boolean;

    @Emit("infoClick")
    infoClick(){

    }

    @Emit("next")
    next(){

    }

    @Emit("previous")
    previous(){

    }
}
</script>

<style lang="less">

    .btn-group{
        display: flex;
        justify-content: space-between;
        height: 40px;
        .btn-container{
            padding: 2px;
            height: 100%;

            &.info{
                flex-grow:1;
            }

            .btn{
                border: 1px solid #ccc;
                text-decoration: none;
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 1rem;
            }
        }
    }
   
</style>


