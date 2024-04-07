import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder
import sys

# Read the dataset
df = pd.read_csv("lung.csv")

# Initialize LabelEncoder
label_encoder = LabelEncoder()

# Encode 'GENDER' column
df['GENDER'] = label_encoder.fit_transform(df['GENDER'])

# Encode 'LUNG_CANCER' column
df['LUNG_CANCER'] = label_encoder.fit_transform(df['LUNG_CANCER'])
x = df.drop('LUNG_CANCER', axis=1)
y = df['LUNG_CANCER']

# Split data into train and test sets
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.25, random_state=42)

model = DecisionTreeClassifier(criterion='entropy', random_state=0)
model.fit(x_train, y_train)

# Prepare input data for prediction
input_data = sys.argv[1:]
input_data = [int(i) for i in input_data]
input_df = pd.DataFrame([input_data], columns=x.columns)  # Ensure columns match the model's input features

# Make prediction
y_pred = model.predict(input_df)
y_pred = int(y_pred[0])
print(y_pred)
