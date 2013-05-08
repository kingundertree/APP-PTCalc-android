'use strict';
// jsq.service("indeedTax", function($rootScope) {
//     var self = this;
    function indeedTax(){};
    // 个税免征
    indeedTax.noIndeedTaxCal = function(filter) {
        // 承诺唯一 + 五年以外
        if (!filter.isOnly && !filter.buyTime) {
            return true;
        }
        return false;
    }

    // 个税按照全额计算 -- 全额计算系数
    indeedTax.byTotalCal = function(filter) {
        if (!filter.houseType && filter.hasInvoice) {
            return 0.01;
        }
        // 非普通住宅 + 五年内 个税按照全额2%计算
        if (filter.houseType && filter.buyTime) {
            return 0.02;
        }
        // 非普通住宅 + 五年外 + 不提供原始发票 个税按照全额2%计算
        if (filter.houseType && !filter.buyTime && filter.hasInvoice) {
            return 0.02;
        }
        // 非普通住宅 + 五年外 + 提供发票 + 不承诺唯一 + 徐汇/静安/长宁/虹口/宝山/普陀）地区，个税按照全额2%计算
        if (filter.houseType && !filter.buyTime && !filter.hasInvoice && filter.isOnly && (filter.region.regionType=="2")) {
            return 0.02;
        }
        return 0;
    }

    // 个税按照利润计算 -- 利润系数为20%
    indeedTax.byProfitCal = function(filter) {
        // 普通住宅 + 提供发票
        if (!filter.houseType && !filter.hasInvoice) {
            return 0.2;
        }
        // 非普通住宅 + 五年内
        if (filter.houseType && filter.buyTime) {
            return 0.2;
        }
        // 非普通住宅 + 五年外 + 提供发票 + 不承诺唯一
        if (filter.houseType && !filter.buyTime && !filter.hasInvoice && filter.isOnly) {
            return 0.2;
        }
        return 0;
    }
// });