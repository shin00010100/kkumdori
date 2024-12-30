package com.kkumdori.shop.order.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // paymentNo 자동 생성
    private Long paymentNo;
    private Integer amount;
    private String status;
    private LocalDateTime paymentTime;
    private LocalDateTime updatedTime;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "orderNo")
    private Order order;
    
    @Enumerated(EnumType.STRING)
    private RefundStatus refundStatus;

    // @JsonCreator로 생성자 정의
    @JsonCreator
    public Payment(
            @JsonProperty("amount") Integer amount,
            @JsonProperty("status") String status,
            @JsonProperty("payment_time") LocalDateTime paymentTime,
            @JsonProperty("updated_time") LocalDateTime updatedTime,
            @JsonProperty("order_id") Long orderId,  // JSON에서 orderId를 받아서 Order 객체를 설정
            @JsonProperty("refund_status") RefundStatus refundStatus
    ) {
        this.amount = amount;
        this.status = status;
        this.paymentTime = paymentTime;
        this.updatedTime = updatedTime;
        this.refundStatus = refundStatus;

        // Order 객체를 찾기 위해 OrderRepository를 사용하여 orderId로 Order 조회
        // 이 부분은 서비스나 다른 방식으로 처리해야 할 수 있습니다
        this.order = new Order();  // Order 객체를 생성 (실제로는 OrderRepository 등을 사용해 처리해야 함)
        this.order.setOrderNo(orderId);  // 또는 Order를 DB에서 조회하여 세팅
    }

    // Getter 및 Setter 메소드들 추가
    public Long getPaymentNo() {
        return paymentNo;
    }

    public void setPaymentNo(Long paymentNo) {
        this.paymentNo = paymentNo;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(LocalDateTime paymentTime) {
        this.paymentTime = paymentTime;
    }

    public LocalDateTime getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public RefundStatus getRefundStatus() {
        return refundStatus;
    }

    public void setRefundStatus(RefundStatus refundStatus) {
        this.refundStatus = refundStatus;
    }

    // RefundStatus Enum 정의
    public enum RefundStatus {
        NONE, REQUESTED, COMPLETED
    }
}
