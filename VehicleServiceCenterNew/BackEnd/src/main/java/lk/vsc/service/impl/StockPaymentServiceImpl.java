package lk.vsc.service.impl;

import lk.vsc.entity.StockPayment;
import lk.vsc.repository.StockPaymentRepository;
import lk.vsc.service.StockPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockPaymentServiceImpl implements StockPaymentService {

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
}
