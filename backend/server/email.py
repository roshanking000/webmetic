import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_verification_code_to_email(user_email: str, url: str):
    # send email
    email_address = os.getenv("email_address")
    email_password = os.getenv("email_password")

    smtp_server = os.getenv("smtp_server")
    smtp_port = os.getenv("smtp_port")

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Start TLS encryption
    server.login(email_address, email_password)

    to_email = user_email  # Recipient's email address
    msg = MIMEMultipart()
    msg["From"] = email_address
    msg["To"] = to_email
    msg["Subject"] = "Verify email address"

    html_content = f"""
    <p>Hi.</p>
    <p>
        Thanks for creating an account with us. Please verify your email address by clicking the url below.
    </p>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
        <tbody>
            <tr>
                <td align="left">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>
                                    <a href="{url}" target="_blank">Verify email address</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <p>Good luck!</p>
    """
    msg.attach(MIMEText(html_content, "html"))

    server.send_message(msg)
    server.quit()


def send_password_reset_code_to_email(user_email: str, url: str):
    # send email
    email_address = os.getenv("email_address")
    email_password = os.getenv("email_password")

    smtp_server = os.getenv("smtp_server")
    smtp_port = os.getenv("smtp_port")

    server = smtplib.SMTP(smtp_server, smtp_port)
    server.starttls()  # Start TLS encryption
    server.login(email_address, email_password)

    to_email = user_email  # Recipient's email address
    msg = MIMEMultipart()
    msg["From"] = email_address
    msg["To"] = to_email
    msg["Subject"] = "Your password reset token (valid for 10min)"

    html_content = f"""
    <p>Hi.</p>
    <p>
        Forgot password? Please reset the password by clicking the url below.
    </p>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
        <tbody>
            <tr>
                <td align="left">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                            <tr>
                                <td>
                                    <a href="{url}" target="_blank">Reset Password</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
    <p>
        If you didn't forget your password, please ignore this email.
    </p>
    <p>Good luck!</p>
    """
    msg.attach(MIMEText(html_content, "html"))

    server.send_message(msg)
    server.quit()
