package lk.vsc.DTO;

public class CreditPaymentDto {

    String company_name;
    String agent_name ;
    String phone_number ;
    double credit_balance;
    String stock_payement_date;
    String paymentType;
    double payment ;
    int stockId;

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public int getStockId() {
        return stockId;
    }

    public void setStockId(int stockId) {
        this.stockId = stockId;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getAgent_name() {
        return agent_name;
    }

    public void setAgent_name(String agent_name) {
        this.agent_name = agent_name;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public double getCredit_balance() {
        return credit_balance;
    }

    public void setCredit_balance(double credit_balance) {
        this.credit_balance = credit_balance;
    }

    public String getStock_payement_date() {
        return stock_payement_date;
    }

    public void setStock_payement_date(String stock_payement_date) {
        this.stock_payement_date = stock_payement_date;
    }

    public double getPayment() {
        return payment;
    }

    public void setPayment(double payment) {
        this.payment = payment;
    }
}
