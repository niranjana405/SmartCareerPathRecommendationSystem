package com.niranjana.careerrecommendedbyotherusers;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.SimpleMailMessage;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendPasswordResetEmail(String toEmail, String resetToken) {
        // Create and configure the email message
        SimpleMailMessage message = new SimpleMailMessage();
        
        message.setFrom("niranjana405@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Password Reset");
        String emailBody = "Your password reset token: " + resetToken;
        message.setText(emailBody);

        

        // Send the email
        javaMailSender.send(message);
        System.out.println("Mail sent successfully");
    }
}
