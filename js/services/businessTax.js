'use strict';

jsq.service("businessTax", function($rootScope) {
    var self = this;

    // 营业税免征
    self.noBusinessTaxCal = function(filter) {
        // 普通住宅 + 五年以外
        if (!filter.houseType && !filter.buyTime) {
            return true;
        }
        return false;
    }

    // 营业税按照全额计算
    self.byTotalCal = function(filter) {
        // 普通住宅，且五年内，则营业税为全额的5.65%
        if (!filter.houseType && filter.buyTime) {
            return 0.0565;
        }
        // 非普通住宅 + 五年内,全额5.65%
        if (filter.houseType && filter.buyTime) {
            return 0.0565;
        }
        // 非普通住宅 + 五年外 + 不提供发票，全额5.65%
        if (filter.houseType && !filter.buyTime && filter.hasInvoice) {
            return 0.0565;
        }
        return 0;
    }

    // 营业税按照利润计算
    self.byDiffCal = function(filter) {
        // 非普通住宅 + 五年外 + 提供发票， 差额的5.65%
        if (filter.houseType && !filter.buyTime && !filter.hasInvoice) {
            return 0.0565;
        };
        return 0;
    }
});