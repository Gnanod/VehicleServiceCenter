package lk.vsc.service;

import lk.vsc.entity.StockPayment;

public interface StockPaymentService {
    void addPayment(StockPayment p1);

    double getMonthlyTotalOutCome();

    double getTodayTotalOutCome();
}
