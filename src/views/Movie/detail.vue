<template>
    <div id="main"
         class="slide-enter-active">
        <Header Title="影片详情">
            <i class="iconfont icon-right"
               @touchstart="handleToBack()"></i>
        </Header>
        <Loading v-if="isLoading"></Loading>
        <div v-else
             id="content"
             class="contentDetail">
            <div class="detail_list">
                <div class="detail_list_bg"
                     :style="{'background-image':'url('+myImg+')'}"></div>
                <div class="detail_list_filter"></div>
                <div class="detail_list_content">
                    <div class="detail_list_img">
                        <img :src="myImg"
                             alt="">
                    </div>
                    <div class="detail_list_info">
                        <h2>{{detailMovie.nm}}</h2>
                        <p>{{detailMovie.enm}}</p>
                        <p>{{detailMovie.cat}}</p>
                        <p>{{detailMovie.star}}</p>
                        <p>{{detailMovie.src}} / {{detailMovie.dur}}分钟</p>
                        <p>{{detailMovie.pubDesc}}</p>
                    </div>
                </div>
            </div>
            <div class="detail_intro">
                <p>{{detailMovie.dra}}</p>
            </div>
            <span>剧照</span>
            <div class="detail_player swiper-container"
                 ref="detail_player">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide"
                        v-for="(item, index) in detailMovie.photos"
                        :key="index">
                        <div>
                            <img :src="item | setPhoto"
                                 alt="">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header';

export default {
    name: 'Detail',
    data () {
        return {
            detailMovie: {},
            myImg: '',
            isLoading: true
        }
    },
    components: {
        Header
    },
    props: ['movieId'],
    mounted () {
        this.axios.get('/ajax/detailmovie?movieId=' + this.movieId)
            .then(res => {
                if (res.status === 200) {
                    this.isLoading = false;
                    this.myImg = res.data.detailMovie.img.replace(/w\.h/, '148.208');
                    this.detailMovie = res.data.detailMovie;
                    this.$nextTick(() => {
                        new Swiper(this.$refs.detail_player, {
                            slidesPerView: 'auto',
                            freeMode: true,
                            freeModeSticky: true
                        });
                    });
                }
            })
            .catch(err => {
                console.error(err);
            })
    },
    methods: {
        handleToBack () {
            this.$router.back();
        }
    },
    filters: {
        setPhoto: function (url) {
            var u = url.replace('@2500w_2500h_1l_0e', '@420w_279h_1e_1c');
            return u.replace(/w\.h/, '');
        }
    }
}
</script>

<style scoped>
#main {
    z-index: 100;
    background: white;
}
#content.contentDetail {
    display: block;
    margin-bottom: 0;
}
#content .detail_list {
    height: 200px;
    width: 100%;
    position: relative;
    overflow: hidden;
}
#content span {
    font-size: 1rem;
}
.detail_list .detail_list_bg {
    width: 100%;
    height: 100%;
    background: 0 40%;
    filter: blur(20px);
    background-size: cover;
    position: absolute;
    left: 0;
    top: 0;
}
.detail_list .detail_list_filter {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #40454d;
    opacity: 0.55;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.detail_list .detail_list_content {
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
}
.detail_list .detail_list_img {
    width: 108px;
    height: 150px;
    border: solid 1px #f0f2f3;
    margin: 20px;
}
.detail_list .detail_list_img img {
    width: 100%;
    height: 100%;
}
.detail_list .detail_list_info {
    margin-top: 20px;
}
.detail_list .detail_list_info h2 {
    font-size: 20px;
    color: white;
    font-weight: normal;
    line-height: 40px;
}
.detail_list .detail_list_info p {
    color: white;
    line-height: 20px;
    font-size: 14px;
    color: #ccc;
}

#content .detail_intro {
    padding: 10px;
}
#content .detail_player {
    margin: 20px;
}
.detail_player .swiper-slide {
    width: 50%;
    height: 120px;
    margin-right: 0.16rem;
    text-align: center;
}
.detail_player .swiper-slide img {
    width: 100%;
    margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
    color: #999;
}
.slide-enter-active {
    animation: 0.3s dSlider;
}
@keyframes dSlider {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
    }
}
</style>