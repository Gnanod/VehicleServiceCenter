package lk.vsc.repository;

import lk.vsc.entity.StockPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface  StockPaymentRepository extends JpaRepository<StockPayment,Integer> {

    @Query(value = "select SUM(payment) from stock_payment s where MONTH(CURDATE())=MONTH(date)",nativeQuery = true)
    Object getMonthlyTotalOutCome();

    @Query(value = "select SUM(payment) from  stock_payment s where CURDATE()=date",nativeQuery = true)
    Object getTodayTotalOutCome();
}
