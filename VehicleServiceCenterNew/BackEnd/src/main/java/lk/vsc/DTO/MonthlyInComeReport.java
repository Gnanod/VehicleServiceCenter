package lk.vsc.DTO;

public class MonthlyInComeReport {

    private double cashPayment;
    private double creditPayment;
    private double fullTotal;
    private String monthName;

    public double getCashPayment() {
        return cashPayment;
    }

    public void setCashPayment(double cashPayment) {
        this.cashPayment = cashPayment;
    }

    public double getCreditPayment() {
        return creditPayment;
    }

    public void setCreditPayment(double creditPayment) {
        this.creditPayment = creditPayment;
    }

    public double getFullTotal() {
        return fullTotal;
    }

    public void setFullTotal(double fullTotal) {
        this.fullTotal = fullTotal;
    }

    public String getMonthName() {
        return monthName;
    }

    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }
}
