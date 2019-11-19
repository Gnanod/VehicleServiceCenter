package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class JobOrderItemDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int jobOrderServiceDetails;
    private int qty;


    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private JobOrder jobOrder;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Item item;
    private double price;
    private String make;
    private String model;
    private String lubeJobType;


    public int getJobOrderServiceDetails() {
        return jobOrderServiceDetails;
    }

    public void setJobOrderServiceDetails(int jobOrderServiceDetails) {
        this.jobOrderServiceDetails = jobOrderServiceDetails;
    }

    public JobOrder getJobOrder() {
        return jobOrder;
    }

    public void setJobOrder(JobOrder jobOrder) {
        this.jobOrder = jobOrder;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getLubeJobType() {
        return lubeJobType;
    }

    public void setLubeJobType(String lubeJobType) {
        this.lubeJobType = lubeJobType;
    }
}
