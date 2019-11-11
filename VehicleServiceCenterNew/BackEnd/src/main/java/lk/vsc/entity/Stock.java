package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stockId;
    private String date;
    private double payment;
    private  String paymentType;
    private double creditBalance;
    private String stockPayementDate;
    @ManyToOne
    private Supplier supplier;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "stock")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<StockItemDetails> stockItemDetails;

    public String getStockPayementDate() {
        return stockPayementDate;
    }

    public void setStockPayementDate(String stockPayementDate) {
        this.stockPayementDate = stockPayementDate;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public double getCreditBalance() {
        return creditBalance;
    }

    public void setCreditBalance(double creditBalance) {
        this.creditBalance = creditBalance;
    }

    public int getStockId() {
        return stockId;
    }

    public void setStockId(int stockId) {
        this.stockId = stockId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getPayment() {
        return payment;
    }

    public void setPayment(double payment) {
        this.payment = payment;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public Set<StockItemDetails> getStockItemDetails() {
        return stockItemDetails;
    }

    public void setStockItemDetails(Set<StockItemDetails> stockItemDetails) {
        for (StockItemDetails i: stockItemDetails
        ) {
            i.setStock(this);
        }

        this.stockItemDetails = stockItemDetails;
    }
}
