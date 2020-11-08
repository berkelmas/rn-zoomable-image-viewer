//
//  RNZoomableImageViewer.swift
//  RNZoomableImageViewer
//
//  Copyright © 2020 Berk Elmas. All rights reserved.
//

import Foundation

@objc(RNZoomableImageViewer)
class RNZoomableImageViewer: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
