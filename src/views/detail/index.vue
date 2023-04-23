<template>
  <breadcrumb separator=">">
    <breadcrumb-item :to="{ path: '/' }">首页</breadcrumb-item>
    <breadcrumb-item :to="{ path: '/' }">中成药</breadcrumb-item>
    <breadcrumb-item>一般外药</breadcrumb-item>
  </breadcrumb>
  <DrugCarousel></DrugCarousel>
  <div class="detail-summary">
    <div class="item-name">布诺芬片</div>
    <div class="detail-section">
      <div class="detail-item">
        <span class="detail-subtitle">规格：</span>
        <span class="detail-content" title="">200ml*1支/每盒</span>
      </div>
      <div class="detail-item">
        <span class="detail-subtitle">剂型：</span>
        <span class="detail-content" title="">200ml*1支/每盒</span>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-item">
        <span class="detail-subtitle">生产厂家：</span>
        <span class="detail-content" title="">复原药业</span>
      </div>
      <div class="detail-item">
        <span class="detail-subtitle">批准文号：</span>
        <span class="detail-content" title="">复原药业</span>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-item">
        <span class="detail-subtitle">保质期：</span>
        <span class="detail-content" title="">36个月</span>
      </div>
      <div class="detail-item">
        <span class="detail-subtitle">中包装：</span>
        <span class="detail-content" title="">12盒</span>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-item">
        <span class="detail-subtitle">生产日期：</span>
        <span class="detail-content" title="">2022-11-17</span>
      </div>
      <div class="detail-item">
        <span class="detail-subtitle">件包装：</span>
        <span class="detail-content" title="">240盒</span>
      </div>
    </div>
    <div class="detail-section">
      <div class="detail-item">
        <span class="detail-subtitle">有效期至：</span>
        <span class="detail-content" title="">2025-11-16</span>
      </div>
    </div>
    <div class="item-price">
      <p class="new-price">春播价<strong>¥23.90</strong></p>
      <p class="old-price">价格<strong>22.90</strong></p>
      <p class="number">月销量600+</p>
    </div>
    <div class="detail-line">
      <div class="detail-item">
        <span class="detail-subtitle">优惠：</span>
        <span class="detail-content" title="">
          <span class="ticket">店铺优惠券</span>
          ¥2优惠券，满¥100可用
          <span class="get-btn">领取</span>
        </span>
      </div>
    </div>
    <div class="detail-line">
      <div class="detail-item">
        <span class="detail-subtitle">配送：</span>
        <div class="detail-content-two" title="">
          <p>湖南长沙&nbsp;至&nbsp;长沙市 开福区 <span class="freight">快递18.00</span></p>
          <p>
            现货，付款后48小时内发货
            <span class="fee">满500包邮</span>
          </p>
        </div>
      </div>
    </div>
    <div class="detail-line">
      <div class="detail-item">
        <span class="detail-subtitle">商品：</span>
        <div class="spec-list">
          <span class="detail-spec active" title=""> 5贴*2袋/盒 1盒 </span>
          <span class="detail-spec" title=""> 5贴*2袋/盒 1箱子 </span>
        </div>
      </div>
    </div>
    <div class="detail-line">
      <div class="detail-item">
        <span class="detail-subtitle">数量：</span>
        <el-input-number v-model="itemNumber" :min="1" :max="100" />
        <span class="stock-tip" title="">
          <span class="detail-subtitle"> 库存： </span>
          有货
        </span>
      </div>
    </div>
    <div class="opt-btn">
      <el-button color="#F5222D">立即购买</el-button>
      <el-button color="#F5222D" plain>加购物车</el-button>
    </div>
  </div>
  <div class="right-section">
    <div class="suppler-title">
      <img class="suppler-level" src="@/assets/images/footer-card1.png" />
      <div class="suppler-level-text">
        <p class="suppler-level-name">优质供应商</p>
        <p class="suppler-level-desc">我的优质服务，您的放心</p>
      </div>
    </div>
    <div class="suppler-content">
      <div class="suppler-name">永正医药有限公司 <span>资质</span></div>
      <img src="@/assets/images/footer-card1.png" class="contact" />
      <div class="suppler-evaluate">
        <div class="suppler-key">客服</div>
        <div class="suppler-score">9.6</div>
      </div>
    </div>
    <div class="suppler-opt">
      <div class="enter-suppler">进入店铺</div>
      <div class="collect-suppler">收藏店铺</div>
    </div>
    <div class="gap"></div>
    <div class="more">
      <div class="more-title">看了又看</div>
      <div class="more-list">
        <div class="more-item">
          <img src="@/assets/images/footer-card1.png" alt="" />
          <p>11.80</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BreadCrumb from '@/components/breadcrumb/breadcrumb.vue';
import BreadCrumItem from '@/components/breadcrumb/breadcrumb-item.vue';
import DrugCarousel from '@/components/drugCarousel/index.vue';
const itemNumber = ref<number>(1);

const router = useRouter();
</script>

<style lang="scss" scoped>
.detail-summary {
  float: left;
  margin-left: 20px;
  .item-name {
    font-size: 24px;
    font-weight: 500;
    color: #262626;
    margin-bottom: 16px;
  }
  .detail-section {
    width: 532px;
    .detail-item {
      width: 50%;
      line-height: 16px;
      display: inline-flex;
      flex-wrap: nowrap;
      // overflow: hidden;
      .detail-subtitle {
        color: #8c8c8c;
        font-size: 14px;
        // width: 70px;
      }
      .detail-content {
        color: #262626;
        font-size: 14px;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        overflow: hidden;
        box-sizing: border-box;
        // max-width: 185px;
      }
    }
  }
  .detail-line {
    line-height: 16px;
    display: flex;
    margin-top: 16px;
    margin-bottom: 16px;
    // overflow: hidden;
    flex-direction: row;
    .detail-item {
      display: flex;
      align-items: center;
      .detail-subtitle {
        color: #8c8c8c;
        font-size: 14px;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        // width: 70px;
      }
      .stock-tip {
        margin-left: 20px;
      }
      .spec-list {
        display: flex;
        flex-direction: row;
        .detail-spec {
          height: 40px;
          border-radius: 4px;
          padding: 8px 12px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          margin-right: 10px;
        }
        .active {
          border: 2px solid #ff4d50;
        }
      }
      .detail-content-two {
        display: inline-block;
      }
      .freight {
        color: #cf1422;
        font-size: 14px;
        font-weight: 400;
        margin-left: 10px;
      }
      .fee {
        color: #cf1422;
        font-size: 14px;
        font-weight: 400;
        margin-left: 10px;
      }
      .ticket {
        width: 65px;
        height: 18px;
        display: inline-block;
        background: #fff2f1;
        border: 1px solid #ffa39e;
        border-radius: 2px;
        color: #f5222d;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        margin-right: 10px;
      }
      .get-btn {
        display: inline-block;
        width: 52px;
        height: 24px;
        color: #fff;
        background: #f5222d;
        border-radius: 4px;
        font-size: 14px;
        text-align: center;
        line-height: 24px;
        margin-left: 10px;
      }
    }
  }
  .opt-btn {
    font-size: 16px;
    font-weight: 600;
    padding-left: 40px;
    button {
      padding-right: 36px;
      padding-left: 36px;
    }
  }
  .item-price {
    display: flex;
    margin-top: 16px;
    margin-bottom: 16px;
    width: 532px;
    height: 56px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding-left: 16px;
    padding-right: 16px;
    background-color: #fff2f1;
    border-radius: 4px;
    .new-price {
      font-size: 14px;
      color: #f5222d;
      strong {
        margin-left: 10px;
        font-size: 30px;
        font-weight: 500;
      }
    }
    .old-price {
      font-size: 14px;
      color: #8c8c8c;
      strong {
        text-decoration: line-through;
        font-size: 18px;
        margin-left: 10px;
      }
    }
    .number {
      font-size: 14px;
      color: #8c8c8c;
    }
  }
}
</style>
