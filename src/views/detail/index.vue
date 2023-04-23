<template>
  <breadcrumb separator=">">
    <breadcrumb-item :to="{ path: '/' }">首页</breadcrumb-item>
    <breadcrumb-item :to="{ path: '/' }">中成药</breadcrumb-item>
    <breadcrumb-item>一般外药</breadcrumb-item>
  </breadcrumb>
  <div class="detail-container">
    <div class="detail-header">
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
          <img class="suppler-level-logo" src="@/assets/images/huiyuan.png" />
          <div class="suppler-level-text">
            <p class="suppler-level-name">优质供应商</p>
            <p class="suppler-level-desc">我的优质服务，您的放心</p>
          </div>
        </div>
        <div class="suppler-content">
          <div class="suppler-name">永正医药有限公司 <span>资质</span></div>
          <img src="@/assets/images/call.png" class="contact" />
          <div class="suppler-evaluate-list">
            <div class="suppler-evaluate-item">
              <div class="suppler-key">客服</div>
              <div class="suppler-score">9.6</div>
            </div>
            <div class="suppler-evaluate-item">
              <div class="suppler-key">售后</div>
              <div class="suppler-score">9.6</div>
            </div>
            <div class="suppler-evaluate-item">
              <div class="suppler-key">物流</div>
              <div class="suppler-score">9.6</div>
            </div>
          </div>
          <div class="suppler-opt">
            <div class="suppler-opt-item">进入店铺</div>
            <div class="suppler-opt-item">收藏店铺</div>
          </div>
        </div>

        <div class="more">
          <div class="more-title">看了又看</div>
          <div class="more-list">
            <div class="more-item">
              <div class="img-container">
                <img src="@/assets/images/footer-card1.png" alt="" />
              </div>
              <p>¥11.80</p>
            </div>
            <div class="more-item">
              <div class="img-container">
                <img src="@/assets/images/footer-card1.png" alt="" />
              </div>
              <p>¥11.80</p>
            </div>
            <div class="more-item">
              <div class="img-container">
                <img src="@/assets/images/footer-card1.png" alt="" />
              </div>
              <p>¥11.80</p>
            </div>
            <div class="more-item">
              <div class="img-container">
                <img src="@/assets/images/footer-card1.png" alt="" />
              </div>
              <p>¥11.80</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <slide-list></slide-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BreadCrumb from '@/components/breadcrumb/breadcrumb.vue';
import SlideList from '@/components/slideList/index.vue';
import BreadCrumItem from '@/components/breadcrumb/breadcrumb-item.vue';
import DrugCarousel from '@/components/drugCarousel/index.vue';
const itemNumber = ref<number>(1);

const router = useRouter();
</script>

<style lang="scss" scoped>
.detail-container {
  width: 1210px;
  margin: 0 auto;
  .detail-header {
    height: 563px;
    .detail-summary {
      float: left;
      width: 532px;
      margin-left: 20px;
      // margin-right: 15px;
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
              line-height: 20px;
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
            p:not(:last-child) {
              margin-bottom: 5px;
            }
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
          height: 40px;
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
    .right-section {
      width: 212px;
      position: static;
      float: right;
      background: #ffffff;
      border: 1px solid #ffdb88;
      border-radius: 4px;
      .suppler-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #fff9e6;
        border-radius: 4px 4px 0px 0px;
        height: 56px;
        .suppler-level-logo {
          width: 32px;
          height: 32px;
          margin-right: 10px;
        }
        .suppler-level-text {
          display: flex;
          flex-direction: column;
          color: #f99b0d;
          .suppler-level-name {
            font-size: 14px;
            font-weight: 600;
          }
          .suppler-level-desc {
            font-size: 12px;
          }
        }
      }
      .suppler-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px dashed #d9d9d9;
        padding-bottom: 12px;
        padding-top: 12px;
        .suppler-name {
          font-size: 16px;
          font-weight: 600;
          color: #262626;
          span {
            display: inline-block;
            margin-left: 5px;
            width: 40px;
            line-height: 24px;
            text-align: center;
            height: 24px;
            background: #fff9e6;
            color: #f99b0d;
            border: 1px solid #ffdb88;
            border-radius: 2px;
          }
        }
        .contact {
          width: 108px;
          height: 32px;
          margin-top: 12px;
        }
        .suppler-evaluate-list {
          display: flex;
          flex-direction: row;
          margin-top: 16px;
          justify-content: space-between;
          width: 100%;
          padding-left: 30px;
          padding-right: 30px;
          .suppler-evaluate-item {
            display: flex;
            flex-direction: column;
            .suppler-key {
              font-size: 14px;
              color: #8c8c8c;
            }
            .suppler-score {
              color: #f5222d;
              font-size: 18px;
            }
          }
        }
        .suppler-opt {
          display: flex;
          font-size: 14px;
          margin-top: 16px;
          .suppler-opt-item {
            padding: 5px 17px;
            color: #595959;
            font-weight: 400;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
          }
          .suppler-opt-item + .suppler-opt-item {
            margin-left: 8px;
          }
        }
      }

      .more {
        padding-left: 12px;
        padding-right: 12px;
        .more-title {
          font-size: 14px;
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 8px;
        }
        .more-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .more-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 10px;
            .img-container {
              width: 88px;
              height: 90px;
              img {
                max-width: 88px;
                max-height: 88px;
              }
            }
            p {
              font-size: 16px;
              margin-top: 5px;
              color: #f5222d;
              font-weight: 600;
            }
          }
          .more-item:nth-child(2n + 1) {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>
