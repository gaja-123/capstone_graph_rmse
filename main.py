import streamlit as st
import plotly.graph_objects as go

# Models with tuning
labels_tuned = ['LightGBM', 'CatBoost', 'Random Forest', 'XGBoost', 'Decision Tree', 'KNN']
before_rmse_tuned = [0.1116, 0.1110, 0.1203, 0.1115, 0.1517, 0.1226]
before_std_tuned = [0.0010, 0.0010, 0.0011, 0.0010, 0.0008, 0.0008]
after_rmse_tuned = [0.1110, 0.1112, 0.1121, 0.1125, 0.1147, 0.1179]
after_std_tuned = [0.0010, 0.0010, 0.0010, 0.0010, 0.0010, 0.0009]

# GLM (no tuning)
glm_label = ['GLM (No Tuning)']
glm_rmse = [0.1300]
glm_std = [0.0010]

# Dynamic y-axis max
y_max = max(max(before_rmse_tuned + glm_rmse), max(after_rmse_tuned + glm_rmse)) + 0.05

# Create figure
fig = go.Figure()

# Before tuning (tuned models)
fig.add_trace(go.Bar(
    x=labels_tuned,
    y=before_rmse_tuned,
    name='RMSE (Before Tuning)',
    error_y=dict(type='data', array=before_std_tuned, visible=True),
    marker_color='#369FEF',
    text=[f"{v:.4f}" for v in before_rmse_tuned],
    textposition='outside'
))

# After tuning (tuned models)
fig.add_trace(go.Bar(
    x=labels_tuned,
    y=after_rmse_tuned,
    name='RMSE (After Tuning)',
    error_y=dict(type='data', array=after_std_tuned, visible=True),
    marker_color='#4BC0C0',
    text=[f"{v:.4f}" for v in after_rmse_tuned],
    textposition='outside'
))

# GLM (no tuning)
fig.add_trace(go.Bar(
    x=glm_label,
    y=glm_rmse,
    name='GLM (No Tuning)',
    error_y=dict(type='data', array=glm_std, visible=True),
    marker_color='#B0BEC5',  # Neutral gray
    text=[f"{v:.4f}" for v in glm_rmse],
    textposition='outside'
))

# Layout
fig.update_layout(
    title='RMSE Comparison with Std. Dev.: Before vs. After Tuning',
    xaxis_title='Models (GLM shown separately: No Tuning Applied)',
    yaxis_title='RMSE',
    yaxis=dict(range=[0, y_max]),
    barmode='group',
    legend=dict(x=0.75, y=1.1),
    margin=dict(t=80, b=40),
    height=500
)

# Streamlit display
st.set_page_config(page_title="RMSE Comparison Dashboard", layout="wide")
st.title("RMSE Comparison Dashboard")
st.plotly_chart(fig, use_container_width=True)
