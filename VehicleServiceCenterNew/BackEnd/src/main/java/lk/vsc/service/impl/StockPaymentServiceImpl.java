package lk.vsc.service.impl;

import lk.vsc.DTO.MonthlyInComeReport;
import lk.vsc.DTO.MonthlyOutComeReport;
import lk.vsc.entity.StockPayment;
import lk.vsc.repository.StockPaymentRepository;
import lk.vsc.service.StockPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockPaymentServiceImpl implements StockPaymentService{

    @Autowired
    private StockPaymentRepository stockPaymentRepository;

    @Override
    public void addPayment(StockPayment p1) {
        stockPaymentRepository.save(p1);
    }

    @Override
    public double getMonthlyTotalOutCome() {
        Object ob = stockPaymentRepository.getMonthlyTotalOutCome();

        if (ob != null) {

            return Double.parseDouble(ob.toString());

        } else {

            return 0;
        }

    }

    @Override
    public double getTodayTotalOutCome() {
        Object ob = stockPaymentRepository.getTodayTotalOutCome();

        if (ob != null) {

            return Double.parseDouble(ob.toString());

        } else {

            return 0;
        }

    }

    @Override
    public List<MonthlyOutComeReport> getMonthlyOutCome() {
        List<Object []> ob = stockPaymentRepository.getMonthlyOutCome();


        List<MonthlyOutComeReport> l = new ArrayList<>();
        for (Object o[]: ob
             ) {
            MonthlyOutComeReport m1 = new MonthlyOutComeReport();
            m1.setMonth(o[1].toString());
            m1.setAmount(Double.parseDouble(o[0].toString()));
            l.add(m1);
        }

        return  l;
    }

    @Override
    public List<MonthlyInComeReport> getMonthlyInComeReport() {
        List<Object []> ob = stockPaymentRepository.getMonthlyInComeReport();
        List<MonthlyInComeReport> l = new ArrayList<>();
        for (Object o[]: ob
        ) {
            MonthlyInComeReport m1 = new MonthlyInComeReport();
            m1.setCashPayment(Double.parseDouble(o[0].toString()));
            m1.setFullTotal(Double.parseDouble(o[1].toString()));
            m1.setCreditPayment(Double.parseDouble(o[2].toString()));
            m1.setMonthName(o[3].toString());
//            m1.setMonth(o[1].toString());
//            m1.setAmount(o[0].toString());
            l.add(m1);
        }
        return l;
    }
}
