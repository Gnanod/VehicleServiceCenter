package lk.vsc.entity;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;


@Entity
public class StockPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int stockPayementId;
    String date;
    double payment;
    @ManyToOne
    private Stock stock;


    public StockPayment(){

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = new Date();
        String newDate = dateFormat.format(date1);
        this.date = newDate;

    }
    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
    }

    public int getStockPayementId() {
        return stockPayementId;
    }

    public void setStockPayementId(int stockPayementId) {
        this.stockPayementId = stockPayementId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(Date date) {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = new Date();
        String newDate = dateFormat.format(date1);

        this.date = newDate;
    }

    public double getPayment() {
        return payment;
    }

    public void setPayment(double payment) {
        this.payment = payment;
    }
}
