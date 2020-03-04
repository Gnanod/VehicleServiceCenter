package lk.vsc.service;

import lk.vsc.DTO.MonthlyInComeReport;
import lk.vsc.DTO.MonthlyOutComeReport;
import lk.vsc.entity.StockPayment;

import java.util.List;

public interface StockPaymentService {
    void addPayment(StockPayment p1);

    double getMonthlyTotalOutCome();

    double getTodayTotalOutCome();

    List<MonthlyOutComeReport> getMonthlyOutCome();

    List<MonthlyInComeReport> getMonthlyInComeReport();

    double getOutCome(String from, String to);

    double getIncome(String from, String to);
}
