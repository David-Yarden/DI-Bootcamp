import numpy as np
import pandas as pd
import scipy.integrate as integrate
import scipy.special as special
from scipy.integrate import quad
import scipy
from scipy.stats import norm

# ==========================================
# Exercise 1
# ==========================================
print("--- Exercise 1 ---")

# Knowing that, instantaneous forward interest rate has the following form:
# f(t, u) = 0.1

def f_t_ex1(x):
    return 0.1

def calculate_zcb(f, nominal=1, start=0, expire=1):
    result, error = quad(f, 0, expire)
    zcb = nominal * np.exp(-result)
    return zcb

# a) zero coupon bond price maturing in 2 years P(0, 2) (notional is 1)
sol_1a = calculate_zcb(f_t_ex1, expire=2)
print("solution for ex 1a:", sol_1a)

# b) zero coupon bond price maturing in 5 years with notional 1000
sol_1b = calculate_zcb(f_t_ex1, expire=5, nominal=1000)
print("solution for ex 1b:", sol_1b)

# c) present value of the sequence consisting of two payments: 250 in 3.5Y and 5000 in 10Y
sol_1c = calculate_zcb(f_t_ex1, expire=3.5, nominal=250) + calculate_zcb(f_t_ex1, expire=10, nominal=5000)
print("solution for ex 1c:", sol_1c)


# ==========================================
# Exercise 2
# ==========================================
print("\n--- Exercise 2 ---")

# f(t, u) = 0.05 + 0.03u
def f_t_ex2(u):
    return 0.05 + 0.03 * u 

# a) zero coupon bond price maturing in 1 years P(0, 1) (notional is 1)
sol_2a = calculate_zcb(f=f_t_ex2, expire=1)
print("solution for ex 2a:", sol_2a)

# b) zero coupon bond price maturing in 4 years with notional 2000
sol_2b = calculate_zcb(f=f_t_ex2, expire=4, nominal=2000)
print("solution for ex 2b:", sol_2b)

# c) present value of the sequence consisting of two payments: 100 in 2.5Y and 1000 in 5Y
sol_2c = calculate_zcb(f=f_t_ex2, expire=2.5, nominal=100) + calculate_zcb(f=f_t_ex2, expire=5, nominal=1000)
print("solution for ex 2c:", sol_2c)


# ==========================================
# Exercise 3
# ==========================================
print("\n--- Exercise 3 ---")

P_0_1 = 0.98
P_0_3 = 0.94

# Bootstrapping
f_1 = (-1) * np.log(P_0_1) # Rate for 0 =< s < 1
f_3 = ((-1) * np.log(P_0_3) - f_1)/2  # Rate for 1 =< s < 3

# a) P(0, 0.7) -> falls in the first bucket (rate f_1)
sol_3a = np.exp(-0.7 * f_1)
print("solution for ex 3a:", sol_3a)

# b) P(0, 1.9) -> falls in both buckets (1 year of f_1 and 0.9 years of f_3)
sol_3b = np.exp(-1 * (1 * f_1 + 0.9 * f_3))
print("solution for ex 3b:", sol_3b)


# ==========================================
# Exercise 5 (Vasicek Analytical)
# ==========================================
print("\n--- Exercise 5 ---")

r0 = 0.03
k = 1
theta = 0.1
sigma = 0.1

def vasicek_pricing_model(r0, k, theta, sigma, T):
    B = (1 - np.exp(-k*T))/k
    A = np.exp((theta - sigma**2/(2*k**2))*(B-T) - sigma**2/(4*k)*B**2)
    return A * np.exp(-B * r0)

# a) P(0, 2)
sol_5a = vasicek_pricing_model(r0, k, theta, sigma, 2)
print("solution for ex 5a:", sol_5a)

# b) P(0, 5)
sol_5b = vasicek_pricing_model(r0, k, theta, sigma, 5)
print("solution for ex 5b:", sol_5b)


# ==========================================
# Exercise 6 (Vasicek Options)
# ==========================================
print("\n--- Exercise 6 ---")

r0 = 0.03
k = 1
theta = 0.1
sigma = 0.1

def vasicek_bond_option(r0, k, theta, sigma, T, t, K, option="call"):
    P_t = vasicek_pricing_model(r0, k, theta, sigma, t)
    P_T = vasicek_pricing_model(r0, k, theta, sigma, T)
    
    B_T =(1 - np.exp(-k*(T-t)))/k 
    # Note: Standard formula often uses B(T-t) for the volatility term, 
    # but strictly speaking B_T in literature usually refers to B(tau).
    # Based on your previous code logic, we are sticking to your implementation structure
    # but strictly, the sigma_p calculation usually requires B(T-t). 
    # Let's ensure consistency with typical Vasicek option formulas:
    # sigma_p = sigma * sqrt((1-exp(-2k*t))/(2k)) * B(T-t)
    
    # Re-using your specific B_T logic from your provided snippet:
    B_T_val = (1 - np.exp(-k*(T-t)))/k 
    
    sigma_p = sigma * np.sqrt((1 - np.exp(-2 * k * t)) / (2 * k)) * B_T_val
    
    h = np.log(P_T / (K * P_t)) / sigma_p + 0.5 * sigma_p
    
    option = option.lower()
    omega = 1 if option == "call" else -1
    
    return omega * (
        P_T * norm.cdf(omega * h)
        - K * P_t * norm.cdf(omega * (h - sigma_p))
    )

# a) Call option
sol_6a = vasicek_bond_option(r0=0.03, k=1, theta=0.1, sigma=0.1, T=5, t=2, K=0.4, option="call")
print("solution for ex 6a:", sol_6a)

# b) Put option
sol_6b = vasicek_bond_option(r0=0.03, k=1, theta=0.1, sigma=0.1, T=5, t=2, K=0.4, option="put")
print("solution for ex 6b:", sol_6b)

# c) Put-Call Parity
P_T_parity = vasicek_pricing_model(r0, k, theta, sigma, 5)
P_t_parity = vasicek_pricing_model(r0, k, theta, sigma, 2)
left_side = sol_6a - sol_6b
right_side = P_T_parity - 0.4 * P_t_parity
print("solution for ex 6c (Parity Check):", np.isclose(left_side, right_side), "| Difference:", left_side - right_side)


# ==========================================
# Exercise 7 (Vasicek MC)
# ==========================================
print("\n--- Exercise 7 ---")

def monte_carlo_simulation_vasicek(r0, k, theta, sigma, T, N, n):
    dt = T/n
    # Simulate paths
    short_rate = np.zeros((n + 1, N))
    short_rate[0, :] = r0
    dW = np.random.normal(0, 1, size=(n, N)) * np.sqrt(dt)

    for t in range(1, n+1):
        short_rate[t, :] = short_rate[t-1,:] + k * (theta - short_rate[t-1,:]) * dt + sigma * dW[t-1, :]

    # Integral for discount factor
    # Using trapezoidal rule approximation or left-point (left-point used here as per your code)
    integral_r = dt * np.sum(short_rate[:-1, :], axis=0)
    
    Bond_price_monte_carlo = np.mean(np.exp(-integral_r))
    estimation_error = np.std(np.exp(-integral_r)) / np.sqrt(N)
    
    # Analytical for comparison
    B = (1 - np.exp(-k*T))/k
    A = np.exp((theta-sigma**2/(2*k**2))*(B-T)-sigma**2/(4*k)*B**2)
    Bond_price_analytical = A * np.exp(-B * r0)

    return Bond_price_monte_carlo, estimation_error, Bond_price_analytical

# a) P(0, 1)
mc_7a, err_7a, ana_7a = monte_carlo_simulation_vasicek(r0=0.03, k=1, theta=0.1, sigma=0.1, T=1, N=5000, n=5000)
print("solution for ex 7a (MC):", mc_7a)
print("solution for ex 7a (Analytical):", ana_7a)

# b) P(0, 4)
mc_7b, err_7b, ana_7b = monte_carlo_simulation_vasicek(r0=0.03, k=1, theta=0.1, sigma=0.1, T=4, N=5000, n=5000)
print("solution for ex 7b (MC):", mc_7b)
print("solution for ex 7b (Analytical):", ana_7b)

# c) Option MC
def vasicek_bond_option_mc(r0, k, theta, sigma, N, n, maturity, exercise, strike):
    dt = maturity / n
    short_rate = np.zeros((n + 1, N))
    short_rate[0, :] = r0
    dW = np.random.normal(0, 1, size=(n, N)) * np.sqrt(dt)

    for i in range(1, n + 1):
        short_rate[i, :] = short_rate[i - 1, :] + k * (theta - short_rate[i - 1, :]) * dt + sigma * dW[i - 1, :]

    idx_ex = round(exercise / dt)
    idx_mat = round(maturity / dt)

    int_0_ex = dt * np.sum(short_rate[:idx_ex, :], axis=0)
    int_ex_mat = dt * np.sum(short_rate[idx_ex:idx_mat, :], axis=0)

    P_ex_mat = np.exp(-int_ex_mat)
    payoff = np.maximum(P_ex_mat - strike, 0)
    option_price = np.mean(np.exp(-int_0_ex) * payoff)

    return option_price

sol_7c = vasicek_bond_option_mc(r0=0.03, k=1, theta=0.1, sigma=0.1, N=5000, n=5000, maturity=5, exercise=3, strike=0.6)
print("solution for ex 7c:", sol_7c)


# ==========================================
# Exercise 8 (CIR MC)
# ==========================================
print("\n--- Exercise 8 ---")

def monte_carlo_simulation_cir(r0, k, theta, sigma, T, N, n):
    dt = T/n
    short_rate = np.zeros((n + 1, N))
    short_rate[0, :] = r0
    dW = np.random.normal(0, 1, size=(n, N)) * np.sqrt(dt)

    for t in range(1, n+1):
        # Using abs() or max(0, x) inside sqrt is often needed for CIR stability in discretization, 
        # though strictly not in the math. Assuming valid parameters here.
        sr_prev = np.maximum(short_rate[t-1, :], 0) 
        short_rate[t, :] = sr_prev + k * (theta - sr_prev) * dt + sigma * np.sqrt(sr_prev) * dW[t-1, :]

    integral_r = dt * np.sum(short_rate[:-1, :], axis=0)
    Bond_price_monte_carlo = np.mean(np.exp(-integral_r))
    estimation_error = np.std(np.exp(-integral_r)) / np.sqrt(N)
    
    return Bond_price_monte_carlo, estimation_error

# a) P(0, 1)
mc_8a, err_8a = monte_carlo_simulation_cir(r0=0.05, k=2, theta=0.05, sigma=0.05, T=1, N=5000, n=5000)
print("solution for ex 8a:", mc_8a)

# b) P(0, 4)
mc_8b, err_8b = monte_carlo_simulation_cir(r0=0.05, k=2, theta=0.05, sigma=0.05, T=4, N=5000, n=5000)
print("solution for ex 8b:", mc_8b)

# c) Option MC
def cir_bond_option_mc(r0, k, theta, sigma, N, n, maturity, exercise, strike):
    dt = maturity / n
    short_rate = np.zeros((n + 1, N))
    short_rate[0, :] = r0
    dW = np.random.normal(0, 1, size=(n, N)) * np.sqrt(dt)

    for i in range(1, n + 1):
        sr_prev = np.maximum(short_rate[i - 1, :], 0)
        short_rate[i, :] = sr_prev + k * (theta - sr_prev) * dt + sigma * np.sqrt(sr_prev) * dW[i - 1, :]

    idx_ex = round(exercise / dt)
    idx_mat = round(maturity / dt)

    int_0_ex = dt * np.sum(short_rate[:idx_ex, :], axis=0)
    int_ex_mat = dt * np.sum(short_rate[idx_ex:idx_mat, :], axis=0)

    P_ex_mat = np.exp(-int_ex_mat)
    payoff = np.maximum(P_ex_mat - strike, 0)
    option_price = np.mean(np.exp(-int_0_ex) * payoff)

    return option_price

sol_8c = cir_bond_option_mc(r0=0.05, k=2, theta=0.05, sigma=0.05, N=5000, n=5000, maturity=5, exercise=3, strike=0.3)
print("solution for ex 8c:", sol_8c)