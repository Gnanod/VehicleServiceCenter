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
    @ManyToOne
    @JsonIgnore
    private Supplier supplier;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "stock")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<StockItemDetails> stockItemDetails;

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
