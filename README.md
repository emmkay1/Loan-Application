# Loan Application

**How to run the project:**

1. Once downloaded, navigate to the project directory in a terminal and run **npm install** to install all the project dependencies.
2. In the project directory, run **npm start** to run the app & view it in a browser at [http://localhost:3000](http://localhost:3000).

- [Loan Application](#loan-application)
  - [Project description](#project-description)
    - [Home Page](#home-page)
    - [Loan Application Page](#loan-application-page)
    - [Loan Payment Page](#loan-payment-page)
    - [Employees Page & Update Page](#employees-page--update-page)
    - [Loans Page](#loans-page)
    - [New Employee Page](#new-employee-page)

## Project description

I built the loan application using React.js for the front end and Postgres (Supabase) for the database. Seven pages make up the loan application: a home page, an application page, a payment page, an employee's page, a loans page, a new employee page and an update employee page.

Employees would interact with the home, loan application, and loan payment pages, while the company responsible for disbursement would interact with the others.

There is a default interest rate of 323.94% on the loan application. During the application process, employees cannot choose their own interest rate. You can find the interest rate in the [Apply](/src/pages/Apply.js) page. Payment Periods can range from six months to ten years in duration.

---

### Home Page
The home page includes a loan calculator app that calculates figures such as the total amount payable over the term of the loan, interest payable, and the monthly payment based on values they input; loan amount, interest, and tenure in years.

### Loan Application Page
The Loan application page has a form where employees input their Employee ID, the loan amount (minimum amount is 5000) they wish to borrow, and the tenure in years (six months to 10 years) to pay back the loan. These figures calculate the necessary loan information to be saved to the database. Employees can only successfully apply for a loan if they don't have any outstanding loans or after six months. Each successful loan application is saved to the database and is viewable by the employee on the payment page by simply inputting their employee ID.

### Loan Payment Page
There is one input field for the employee ID on the payment page. Upon successful submission, a loan card appears with a payment button and the loan status. Employees can make their monthly payments by clicking the pay icon button. If no loans with the employee ID are present, a message indicating this is displayed.

### Employees Page & Update Page
The Employees page contains information about all employees. This page displays employee cards with all necessary employee information. The company can update employee information by clicking the edit icon button (which opens the update page), and the changes show when the database is updated after submission.

### Loans Page
The loans page shows all the loans. The company has the option of deleting a loan. Loans are divided into two categories: those paid in full (paid) and those outstanding (owing). Loans can be filtered based on their status i.e paid or owing.

### New Employee Page
The new employee page is where the company can add new employees. The page contains a form with input fields for the employee's name, email, citizen ID, and salary. An Employee's ID is generated automatically in the backend. The minimum salary an employee can have is 5000. The citizen ID is a six digit number.
