package lk.vsc.service;

import lk.vsc.DTO.MonthlyOutComeReport;
import lk.vsc.entity.StockPayment;

import java.util.List;

public interface StockPaymentService {
    void addPayment(StockPayment p1);

    double getMonthlyTotalOutCome();

    double getTodayTotalOutCome();

    List<MonthlyOutComeReport> getMonthlyOutCome();
}
