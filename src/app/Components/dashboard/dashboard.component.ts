import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { CourseService } from '../../Services/course.service';
import { returnOrder } from '../../Models/returnorder';
import { Course } from '../../Models/Course';
import { AccounteService } from '../../Services/Account.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {  ChartOptions, ChartType , Chart, registerables } from "chart.js";
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [provideCharts(withDefaultRegisterables())]
})
export class DashboardComponent implements OnInit {
  orders: returnOrder[] = [];
  courses: Course[] = [];

  userId: string | null = null;

  totalRevenue: number = 0;
  totalOrders: number = 0;
  totalCourses: number = 0;
  orderItemsCount: number = 0;

  // Chart Data
  orderChartData: { data: number[]; label: string; backgroundColor: string; borderColor: string; borderWidth: number }[] = [];
  orderChartLabels: string[] = [];
  courseChartData: { data: number[]; label: string; backgroundColor: string; borderColor: string; borderWidth: number }[] = [];
  courseChartLabels: string[] = [];


  orderChartType: ChartType = 'bar';
  courseChartType: ChartType = 'pie';

  // Chart Options
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date / Course Title',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  constructor(
    private orderService: OrderService,
    private courseService: CourseService,
    private auth: AccounteService
  ) {}

  ngOnInit() {
    this.userId = this.auth.getUserId(); // Fetch user ID from authentication service

    // Fetch user orders
    this.orderService.getUserOrders(this.userId).subscribe((orders) => {
      this.orders = orders;
      this.calculateOrderStatistics();
      this.prepareOrderChartData();
    });

    // Fetch courses for the user
    this.courseService.getCoursesForUser(this.userId).subscribe((courses) => {
      this.courses = courses;
      this.calculateCourseStatistics();
      this.prepareCourseChartData();
    });
  }

  private calculateOrderStatistics() {
    this.totalRevenue = this.orders.reduce((sum, order) => sum + order.totalPrice, 0);
    this.totalOrders = this.orders.length;
    this.orderItemsCount = this.orders.reduce((count, order) => count + order.orderItems.length, 0);
  }

  private calculateCourseStatistics() {
    this.totalCourses = this.courses.length;
  }

  private prepareOrderChartData() {
    const orderCounts = this.getOrderCountsByDate();

    this.orderChartLabels = Object.keys(orderCounts);
    this.orderChartData = [
      {
        data: Object.values(orderCounts),
        label: 'Orders',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ];
  }

  private prepareCourseChartData() {
    const courseCounts = this.getCourseCounts();

    this.courseChartLabels = Object.keys(courseCounts);
    this.courseChartData = [
      {
        data: Object.values(courseCounts),
        label: 'Courses Enrolled',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ];
  }

  // Helper function to count orders by date
  private getOrderCountsByDate(): Record<string, number> {
    return this.orders.reduce((acc, order) => {
      const orderDate = new Date(order.orderDate).toLocaleDateString();
      acc[orderDate] = (acc[orderDate] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  // Helper function to count courses
  private getCourseCounts(): Record<string, number> {
    return this.courses.reduce((acc, course) => {
      acc[course.title] = (acc[course.title] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}
