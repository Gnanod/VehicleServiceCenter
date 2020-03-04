package lk.vsc.repository;

import lk.vsc.entity.StockPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface  StockPaymentRepository extends JpaRepository<StockPayment,Integer> {

    @Query(value = "select SUM(payment) from stock_payment s where MONTH(CURDATE())=MONTH(date)",nativeQuery = true)
    Object getMonthlyTotalOutCome();

    @Query(value = "select SUM(payment) from  stock_payment s where CURDATE()=date",nativeQuery = true)
    Object getTodayTotalOutCome();

    @Query(value = "select Sum(payment),MONTHNAME(date) as 'Month Name' from stock_payment where Year(date)=Year(CURDATE()) group by year(date),MONTHNAME(date)",nativeQuery = true)
    List<Object[]> getMonthlyOutCome();

    @Query(value = "" +
            "select SUM(Payment) as CashPayment,Sum(fi.total_amount) As FullTotal, " +
            "(SUM(fi.total_amount)-SUM(Payment)) As CreditPayment,MONTHNAME(fip.date) as MonthName " +
            "from  final_invoice_payment fip,final_invoice fi  " +
            "where fip.final_invoice_final_invoice_id=fi.final_invoice_id and Year(fip.date)=Year(CURDATE()) " +
            "group by year(fip.date),MONTHNAME(fip.date)",nativeQuery = true)
    List<Object[]> getMonthlyInComeReport();


    @Query(value = "select SUM(s.payment) from  stock_payment s where s.date >= :fromout and s.date<=:toout ",nativeQuery = true)
    Object getOutCome(@Param("fromout")String from, @Param("toout")String to);

    @Query(value = "select SUM(j.payment) from  final_invoice_payment j where j.date >= :fromIn and j.date<=:toIn ",nativeQuery = true)
    Object getIncome(@Param("fromIn")String from,@Param("toIn") String to);
}
