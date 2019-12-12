package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int stockId;
    private String date;
   private double beforeDiscountTotal;
    private double discount;
    private double finalDiscountedTotal;
    private  String paymentType;
    private double creditBalance;
    private String stockPayementDate;

    @ManyToOne
    private Supplier supplier;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "stock")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<StockItemDetails> stockItemDetails;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "stock")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<StockPayment> stockPayment;


    public List<StockPayment> getStockPayment() {
        return stockPayment;
    }

    public void setStockPayment(List<StockPayment> stockPayment) {
        for (StockPayment i: stockPayment
        ) {
            i.setStock(this);
        }

        this.stockPayment = stockPayment;
    }

    public String getStockPayementDate() {
        return stockPayementDate;
    }

    public void setStockPayementDate(String stockPayementDate) {
        this.stockPayementDate = stockPayementDate;
    }

    public double getFinalDiscountedTotal() {
        return finalDiscountedTotal;
    }

    public void setFinalDiscountedTotal(double finalDiscountedTotal) {
        this.finalDiscountedTotal = finalDiscountedTotal;
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

//    public double getPayment() {
//        return payment;
//    }

//    public void setPayment(double payment) {
//        this.payment = payment;
//    }

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

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public double getBeforeDiscountTotal() {
        return beforeDiscountTotal;
    }

    public void setBeforeDiscountTotal(double beforeDiscountTotal) {
        this.beforeDiscountTotal = beforeDiscountTotal;
    }
}
